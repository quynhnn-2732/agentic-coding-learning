import { NextResponse } from 'next/server'
import { createClient } from '@/libs/supabase/server'

export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // Clear all Supabase auth cookies explicitly to guarantee session removal
  const response = NextResponse.json({ success: true })

  // Supabase SSR stores tokens in cookies with names starting with 'sb-'
  // Delete them by setting maxAge to 0
  const cookieOptions = {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  }

  // Get cookie names from the request — clear any sb-* cookies
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  for (const cookie of allCookies) {
    if (cookie.name.startsWith('sb-')) {
      response.cookies.set(cookie.name, '', cookieOptions)
    }
  }

  return response
}
