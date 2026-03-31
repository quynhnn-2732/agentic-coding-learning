import type { Metadata } from 'next'
import { createClient } from '@/libs/supabase/server'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { HeroSection } from '@/app/_components/homepage/hero-section'
import { B4Content } from '@/app/_components/homepage/b4-content'
import { AwardsSection } from '@/app/_components/homepage/awards-section'
import { SunkudosSection } from '@/app/_components/homepage/sunkudos-section'
import { HomepageFooter } from '@/app/_components/homepage/footer'

export const metadata: Metadata = { title: 'SAA 2025 — Homepage' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <main className="overflow-x-clip bg-[#00101A]">
      <HomepageHeader avatarUrl={avatarUrl} />
      <HeroSection />
      <div className="flex flex-col gap-[120px] py-[120px]">
        <B4Content />
        <AwardsSection />
        <SunkudosSection />
      </div>
      <HomepageFooter />
    </main>
  )
}
