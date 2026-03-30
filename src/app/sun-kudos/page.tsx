import type { Metadata } from 'next'
import { createClient } from '@/libs/supabase/server'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { HomepageFooter } from '@/app/_components/homepage/footer'
import { WidgetButton } from '@/app/_components/homepage/widget-button'
import { KudosKeyvisual } from '@/app/_components/sun-kudos/kudos-keyvisual'
import { KudosBanner } from '@/app/_components/sun-kudos/kudos-banner'
import { KudosActionBar } from '@/app/_components/sun-kudos/kudos-action-bar'
import { SectionHeader } from '@/app/_components/sun-kudos/section-header'
import { KudosFeed } from '@/app/_components/sun-kudos/kudos-feed'
import { HighlightCarousel } from '@/app/_components/sun-kudos/highlight-carousel'
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
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg-dark)]">
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
        {/* TODO: T046 — Wire SpotlightBoard here */}
        <div className="px-4 md:px-[144px] mt-6 text-white/40 text-sm">
          [Spotlight Board placeholder — {spotlight.total_kudos} kudos, {spotlight.users.length} users]
        </div>
      </section>

      {/* All Kudos + Stats Sidebar zone — 120px gap */}
      <section className="relative z-[1] mt-[120px]">
        <SectionHeader title="ALL KUDOS" />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[var(--spacing-kudos-feed-sidebar)] px-4 md:px-[144px] mt-6">
          {/* Feed column */}
          <div className="flex-1 min-w-0 lg:max-w-[680px]">
            <KudosFeed initialKudos={feedKudos} initialHasMore={feedHasMore} />
          </div>
          {/* Sidebar column */}
          <div className="w-full lg:w-[422px] flex flex-col gap-[var(--spacing-kudos-sidebar-gap)]">
            {/* TODO: T043 — Wire KudosStatsPanel + TopSunnerLeaderboard here */}
            <div className="text-white/40 text-sm">
              [Stats placeholder — received: {stats.received_count}, sent: {stats.sent_count}]
            </div>
            <div className="text-white/40 text-sm">
              [Leaderboard placeholder — {leaderboard.length} items]
            </div>
          </div>
        </div>
      </section>

      <div className="mt-[120px]">
        <HomepageFooter />
      </div>
      <WidgetButton />
    </main>
  )
}
