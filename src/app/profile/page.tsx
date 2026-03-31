import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/libs/supabase/server'
import { HomepageHeader } from '@/app/_components/homepage/header'

export const metadata: Metadata = { title: 'SAA 2025 — Profile' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const t = await getTranslations('Profile')

  return (
    <main className="min-h-screen bg-[#00101A]">
      <HomepageHeader avatarUrl={avatarUrl} />
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="font-montserrat text-2xl font-bold text-white">
          {t('title')}
        </h1>
        <p className="mt-4 font-montserrat text-base text-white/60">
          {t('comingSoon')}
        </p>
      </div>
    </main>
  )
}
