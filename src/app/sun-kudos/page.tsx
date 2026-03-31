import type { Metadata } from 'next'
import { createClient } from '@/libs/supabase/server'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { HomepageFooter } from '@/app/_components/homepage/footer'
import { KudosKeyvisual } from '@/app/_components/sun-kudos/kudos-keyvisual'
import { KudosBanner } from '@/app/_components/sun-kudos/kudos-banner'
import { KudosActionBar } from '@/app/_components/sun-kudos/kudos-action-bar'
import { SectionHeader } from '@/app/_components/sun-kudos/section-header'
import { KudosFeed } from '@/app/_components/sun-kudos/kudos-feed'
import { HighlightCarousel } from '@/app/_components/sun-kudos/highlight-carousel'
import { SpotlightBoard } from '@/app/_components/sun-kudos/spotlight-board'
import { KudosStatsPanel } from '@/app/_components/sun-kudos/kudos-stats-panel'
import { TopSunnerLeaderboard } from '@/app/_components/sun-kudos/top-sunner-leaderboard'
import {
  fetchKudosFeed,
  fetchHighlightedKudos,
  fetchUserStats,
  fetchLeaderboard,
  fetchSpotlight,
  fetchHashtags,
  fetchDepartments,
} from '@/libs/data/kudos-queries'

export const metadata: Metadata = { title: 'SAA 2025 — Sun* Kudos' }

export default async function SunKudosPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  const [
    { data: feedKudos, hasMore: feedHasMore },
    highlightedKudos,
    stats,
    leaderboard,
    spotlight,
    hashtags,
    departments,
  ] = await Promise.all([
    fetchKudosFeed(1, 10),
    fetchHighlightedKudos(),
    fetchUserStats(),
    fetchLeaderboard(),
    fetchSpotlight(),
    fetchHashtags(),
    fetchDepartments(),
  ])

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[var(--color-bg-dark)]">
      <KudosKeyvisual />
      <HomepageHeader avatarUrl={avatarUrl} activePath="sun-kudos" />

      {/* Hero zone — banner at y=184 per Figma (header 80px + 104px padding) */}
      <div className="relative z-[1] pt-[80px] md:pt-[104px]">
        <KudosBanner />
        <KudosActionBar />
      </div>

      {/* Highlight Kudos zone — 64px gap from action bar (Frame 532 gap in Figma) */}
      <section className="relative z-[1] mt-[64px]">
        <HighlightCarousel
          initialKudos={highlightedKudos}
          hashtags={hashtags}
          departments={departments}
        />
      </section>

      {/* Spotlight Board zone — 120px gap between major sections (Bìa gap in Figma) */}
      <section className="relative z-[1] mt-[120px]">
        <SectionHeader title="SPOTLIGHT BOARD" />
        <SpotlightBoard data={spotlight} />
      </section>

      {/* All Kudos + Stats Sidebar zone — 120px gap */}
      <section className="relative z-[1] mt-[120px]">
        <SectionHeader title="ALL KUDOS" />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[80px] px-4 md:px-[144px] mt-6 max-w-[1440px] mx-auto">
          {/* Feed column */}
          <div className="flex-1 min-w-0 lg:max-w-[680px]">
            <KudosFeed initialKudos={feedKudos} initialHasMore={feedHasMore} />
          </div>
          {/* Sidebar column */}
          <div className="w-full lg:w-[422px] flex flex-col gap-6">
            <KudosStatsPanel stats={stats} />
            <TopSunnerLeaderboard users={leaderboard} />
          </div>
        </div>
      </section>

      <div className="mt-[120px]">
        <HomepageFooter />
      </div>
    </main>
  )
}
