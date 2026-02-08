# Authentication Roadmap & Strategy
> **Status:** Planning Phase
> **Technology:** Supabase Auth
> **Roles:** Worker (default), Admin

---

## 1. Authentication Strategy

### Core Identity Provider
We will use **Supabase Auth** as the backend service. It handles user management, sessions, and security constraints out of the box.

### Login Methods
1.  **Email & Password**: Primary method.
2.  **Google OAuth**: Optional method for quick access (requires Google Cloud Console setup).

### User Roles & Permissions
We will implement Role-Based Access Control (RBAC) using a `role` column in the `users` table.

| Role | Access Level |
| :--- | :--- |
| **Worker** (`worker`) | Default role. Can access personal dashboard, view own certificates/courses. |
| **Admin** (`admin`) | Can access `/admin` panel, manage all users, issue certificates. |

---

## 2. Technical Architecture

### Database Schema (Supabase)
This extends the built-in `auth.users` table. We will create a `public.users` table that references `auth.users` via a Trigger to keep them in sync.

```sql
-- public.users table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  dni text unique,
  phone text,
  role text default 'worker' check (role in ('worker', 'admin')),
  company text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) is ESSENTIAL
alter table public.users enable row level security;

-- Policies
-- 1. Users can view their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- 2. Users can update their own profile
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- 3. Admins can view all profiles
create policy "Admins can view all profiles" on public.users
  for select using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );
  
-- 4. Admins can update all profiles
create policy "Admins can update all profiles" on public.users
  for update using (
    exists (select 1 from public.users where id = auth.uid() and role = 'admin')
  );

-- Trigger to create public.users profile on new auth.users signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'worker') -- Default to worker, but allow override (careful with this in prod)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Middleware Protection
We will use Next.js Middleware to protect routes based on authentication status and roles.

- **Private Routes**: `/dashboard/*`, `/admin/*`
- **Logic**:
  - If accessing private route & no session -> Redirect to `/login`.
  - If accessing `/admin/*` & role != 'admin' -> Redirect to `/dashboard` (or 403).
  - If accessing `/login` & session active -> Redirect to `/dashboard` (or `/admin` if admin).

### Client-Side Integration
- **`utils/supabase/client.ts`**: Singleton for client-side components.
- **`utils/supabase/server.ts`**: For Server Components, Actions, and API routes.
- **`utils/supabase/middleware.ts`**: To refresh sessions.
- **`components/AuthProvider.tsx`**: (Optional but recommended) React Context to provide `user` and `profile` object to the app tree, avoiding prop drilling or repeated fetches.

---

## 3. Implementation Steps

### Phase A: Setup & Configuration
1.  **Init Supabase Project**: Set up project in Supabase dashboard.
2.  **Env Vars**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
3.  **Database Migration**: Run the SQL script (above) to create tables, RLS policies, and triggers.

### Phase B: Auth UI Components
1.  **Login Page (`/login`)**:
    - Email/Password form.
    - "Sign in with Google" button.
    - Link to Register.
2.  **Register Page (`/registro`)**:
    - Fields: Full Name, Email, Password, DNI, Phone.
    - On submit -> `supabase.auth.signUp()`.
    - DNI and Phone can be updated in `public.users` after signup if metadata doesn't catch it, or passed as `options.data` in signUp.

### Phase C: Dashboard & Role Logic
1.  **Middleware**: Implement `middleware.ts` to handle route protection and role checks.
2.  **Dashboard Layout**: Create a layout that fetches the user profile and redirects if unauthorized.
3.  **Admin Layout**: Strict check for `role === 'admin'`.

### Phase D: Testing Workflow
1.  **Worker Flow**: Register -> Redirect to Dashboard -> View Profile.
2.  **Admin Flow**: Manual update of a user to 'admin' in Supabase Table Editor -> Login -> Access /admin.
3.  **Security Test**: Try to access /admin as a worker (should fail). Try to read other users' data via API (should fail due to RLS).
