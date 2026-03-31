'use server'

import { headers } from 'next/headers'
import { createClient } from '@/libs/supabase/server'

export async function signOut(): Promise<{ success: true } | { error: string }> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    return { error: error.message }
  }
  return { success: true }
}

export async function signInWithGoogle(): Promise<{ url: string } | { error: string }> {
  const headersList = await headers()
  // Derive origin from request headers; fall back to env var for SSR contexts without origin header
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    headersList.get('origin') ??
    'http://localhost:3000'

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error || !data.url) {
    return { error: error?.message ?? 'auth_error' }
  }

  return { url: data.url }
}
