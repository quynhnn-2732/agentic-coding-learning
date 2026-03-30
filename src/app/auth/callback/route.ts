import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_error`)
  }

  const cookieStore = await cookies()
  const redirectTo = NextResponse.redirect(`${origin}/`)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // Set cookies directly on the redirect response so the browser
          // receives the session tokens when following the redirect to "/"
          cookiesToSet.forEach(({ name, value, options }) => {
            redirectTo.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error.message)}`
    )
  }

  // Guard against a null session even when error is null (e.g. PKCE verifier mismatch)
  if (!data.session) {
    return NextResponse.redirect(`${origin}/login?error=session_not_created`)
  }

  return redirectTo
}
