import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/libs/supabase/server'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { HeroSection } from '@/app/_components/homepage/hero-section'
import { B4Content } from '@/app/_components/homepage/b4-content'
import { AwardsSection } from '@/app/_components/homepage/awards-section'
import { SunkudosSection } from '@/app/_components/homepage/sunkudos-section'
import { HomepageFooter } from '@/app/_components/homepage/footer'
import { WidgetButton } from '@/app/_components/homepage/widget-button'

export const metadata: Metadata = { title: 'SAA 2025 — Homepage' }

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <main className="relative overflow-x-hidden bg-[#00101A]">
      {/* 3.5_Keyvisual — page-level absolute, 1512×1392px per Figma design */}
      <div className="absolute top-0 left-0 right-0 h-[1392px] overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/homepage/hero-keyvisual.png"
          alt=""
          fill
          priority
          quality={100}
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Cover — diagonal gradient (bottom-left → transparent), per Figma "Cover" layer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)',
          }}
        />
        {/* Bottom fade — blends keyvisual into dark page below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[320px]"
          style={{ background: 'linear-gradient(to top, #00101A 0%, transparent 100%)' }}
        />
      </div>

      <HomepageHeader avatarUrl={avatarUrl} />
      <HeroSection />
      <div className="relative z-[1] flex flex-col gap-[120px] pt-[120px] pb-[96px]">
        <B4Content />
        <AwardsSection />
        <SunkudosSection />
      </div>
      <HomepageFooter />
      <WidgetButton />
    </main>
  )
}
