import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const PROTECTED_ROUTES = ['/dashboard', '/admin', '/auditor', '/perfil']
const ADMIN_ROUTES = ['/admin']
const AUDITOR_ROUTES = ['/auditor']
const AUTH_ROUTES = ['/login', '/registro']

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user, appRole } = await updateSession(request)
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r))
  const isAuditorRoute = AUDITOR_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  // Auth guard: unauthenticated → /login
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Role guard: admin routes
  if (isAdminRoute && user && appRole !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(url)
  }

  // Role guard: auditor routes (admin also allowed)
  if (isAuditorRoute && user && appRole !== 'auditor' && appRole !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
