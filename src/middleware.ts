import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/libs/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request)

  // Refresh session — keeps the cookie alive and rotates tokens when needed.
  // IMPORTANT: Do not add any code between createClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Helper: build a redirect response that carries any refreshed session cookies
  // from supabaseResponse. Per Supabase SSR docs, redirect responses MUST copy
  // these cookies or the session can become de-synced.
  function redirectWith(destination: string | URL) {
    const redirectResponse = NextResponse.redirect(destination)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
    return redirectResponse
  }

  // Authenticated user visiting login page → send to homepage
  if (user && pathname === '/login') {
    return redirectWith(new URL('/', request.url))
  }

  // Unauthenticated user visiting protected routes → send to login
  const isPublic = pathname === '/login' || pathname.startsWith('/auth')
  if (!user && !isPublic) {
    return redirectWith(new URL('/login', request.url))
  }

  // Return supabaseResponse so any token-refresh cookies are forwarded
  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|ico|webp)$).*)'],
}
