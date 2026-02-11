import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'

export type AppRole = 'worker' | 'admin' | 'auditor'

interface SessionResult {
  supabaseResponse: NextResponse
  user: User | null
  appRole: AppRole | null
}

export async function updateSession(request: NextRequest): Promise<SessionResult> {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // SECURITY: getUser() validates JWT server-side. Never use getSession() for auth checks.
  const { data: { user } } = await supabase.auth.getUser()

  let appRole: AppRole | null = null

  if (user) {
    // After getUser() validates the session, read the access token to extract custom claims.
    // The custom_access_token_hook injects app_role into JWT claims.
    const { data: { session } } = await supabase.auth.getSession()

    if (session?.access_token) {
      try {
        const payload = JSON.parse(
          Buffer.from(session.access_token.split('.')[1], 'base64url').toString()
        )
        appRole = payload.app_role ?? null
      } catch {
        appRole = null
      }
    }
  }

  return { supabaseResponse, user, appRole }
}
