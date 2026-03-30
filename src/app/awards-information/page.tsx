import type { Metadata } from 'next'
import { createClient } from '@/libs/supabase/server'
import { awardsData } from '@/libs/data/awards'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { SunkudosSection } from '@/app/_components/homepage/sunkudos-section'
import { HomepageFooter } from '@/app/_components/homepage/footer'
import { KeyvisualBanner } from '@/app/_components/awards-information/keyvisual-banner'
import { AwardEntry } from '@/app/_components/awards-information/award-entry'
import { AwardSidebar } from '@/app/_components/awards-information/award-sidebar'

export const metadata: Metadata = {
  title: 'Hệ thống giải thưởng — Sun* Annual Awards 2025',
}

export default async function AwardsInformationPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <main className="bg-bg-dark min-h-screen">
      <HomepageHeader avatarUrl={avatarUrl} activePath="awards-information" />
      <KeyvisualBanner />

      {/* Main padded content: sidebar + awards */}
      <div className="px-4 md:px-[144px] py-[96px] flex flex-col gap-[80px] max-w-[1440px] mx-auto w-full">
        {/* Sidebar + awards list in flex-row on desktop */}
        <div className="flex flex-row gap-[80px]">
          {/* Sidebar hidden on mobile */}
          <div className="hidden md:block flex-shrink-0">
            <AwardSidebar />
          </div>
          <div className="flex flex-col gap-[80px] flex-1 min-w-0">
            {awardsData.map((award, i) => (
              <AwardEntry
                key={award.id}
                award={award}
                imagePosition={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SunkudosSection manages its own horizontal padding — must be outside padded wrapper */}
      <div className="pb-[96px]">
        <SunkudosSection />
      </div>

      <HomepageFooter />
    </main>
  )
}
