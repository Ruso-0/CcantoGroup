-- ============================================================================
-- Ccanto Group Arequipa — Initial Schema
-- Tables: profiles, certificates
-- Security: RLS with JWT Custom Claims (no self-referential queries)
-- ============================================================================

-- ============================================================================
-- 1. TABLES
-- ============================================================================

-- Extends auth.users with application-specific profile data
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  dni text unique,
  phone text,
  role text not null default 'worker' check (role in ('worker', 'admin', 'auditor')),
  company text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create index idx_profiles_role on public.profiles(role);
create index idx_profiles_dni on public.profiles(dni) where dni is not null;

-- SST Mining Certificates
create table public.certificates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  public_hash text unique not null,
  certificate_type text not null check (certificate_type in ('sst_basic', 'sst_advanced', 'first_aid', 'hazmat')),
  issue_date date not null,
  expiry_date date not null,
  issued_by_admin_id uuid references public.profiles(id) on delete set null,
  document_url text,
  status text not null default 'active' check (status in ('active', 'expired', 'revoked')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create index idx_certificates_user_id on public.certificates(user_id);
create index idx_certificates_public_hash on public.certificates(public_hash);
create index idx_certificates_status on public.certificates(status);

-- ============================================================================
-- 2. ROW LEVEL SECURITY
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.certificates enable row level security;

-- Helper: extract app_role from JWT claims
-- Usage: (current_setting('request.jwt.claims', true)::json->>'app_role')

-- ---------- PROFILES POLICIES ----------

-- Users can read their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- Users can update their own profile
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Admins can read all profiles (JWT-based, no recursion)
create policy "profiles_select_admin" on public.profiles
  for select using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Admins can update all profiles
create policy "profiles_update_admin" on public.profiles
  for update using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Admins can insert profiles (for manual user creation)
create policy "profiles_insert_admin" on public.profiles
  for insert with check (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Auditors can read all profiles (read-only)
create policy "profiles_select_auditor" on public.profiles
  for select using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'auditor'
  );

-- ---------- CERTIFICATES POLICIES ----------

-- Users can read their own certificates
create policy "certificates_select_own" on public.certificates
  for select using (auth.uid() = user_id);

-- Admins can read all certificates
create policy "certificates_select_admin" on public.certificates
  for select using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Admins can issue certificates
create policy "certificates_insert_admin" on public.certificates
  for insert with check (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Admins can update certificates
create policy "certificates_update_admin" on public.certificates
  for update using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Admins can revoke/delete certificates
create policy "certificates_delete_admin" on public.certificates
  for delete using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'admin'
  );

-- Auditors can read all certificates (read-only)
create policy "certificates_select_auditor" on public.certificates
  for select using (
    (current_setting('request.jwt.claims', true)::json->>'app_role') = 'auditor'
  );

-- ============================================================================
-- 3. FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-create profile on signup (HARDCODED 'worker' — no metadata override)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'worker' -- SECURITY: Always worker. Admin promotion via dashboard only.
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger certificates_updated_at
  before update on public.certificates
  for each row
  execute function public.handle_updated_at();

-- ============================================================================
-- 4. CUSTOM ACCESS TOKEN HOOK (JWT Claims Injection)
-- ============================================================================
-- Injects app_role into JWT so RLS policies and middleware can read it
-- without querying the database.
--
-- ACTIVATION REQUIRED: Supabase Dashboard → Authentication → Hooks
--   → Custom Access Token → Schema: public → Function: custom_access_token_hook

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = (event->>'user_id')::uuid;

  claims := event->'claims';

  if user_role is not null then
    claims := jsonb_set(claims, '{app_role}', to_jsonb(user_role));
  else
    claims := jsonb_set(claims, '{app_role}', to_jsonb('worker'::text));
  end if;

  event := jsonb_set(event, '{claims}', claims);
  return event;
end;
$$;

grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

-- ============================================================================
-- 5. PUBLIC CERTIFICATE VERIFICATION (security definer)
-- ============================================================================
-- Used by the QR verification page. Returns ONLY safe fields.
-- Does NOT expose DNI, email, or phone.

create or replace function public.verify_certificate(hash text)
returns table (
  holder_name text,
  certificate_type text,
  issue_date date,
  expiry_date date,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select
    p.full_name as holder_name,
    c.certificate_type,
    c.issue_date,
    c.expiry_date,
    c.status
  from public.certificates c
  join public.profiles p on c.user_id = p.id
  where c.public_hash = hash;
end;
$$;

-- Allow anonymous access to verification function
grant execute on function public.verify_certificate to anon, authenticated;
