import Image from 'next/image'
import Link from 'next/link'
import { NavScrollLink } from './nav-scroll-link'
import { LanguageSelector } from '@/app/_components/layout/language-selector'
import { NotificationBellIcon } from '@/app/_components/icons/notification-bell-icon'
import { AccountIcon } from '@/app/_components/icons/account-icon'

interface HomepageHeaderProps {
  avatarUrl?: string
  activePath?: 'awards-information' | 'sun-kudos'
}

const NORMAL_NAV_CLASS =
  'px-4 py-4 rounded-sm font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]'
const ACTIVE_NAV_CLASS =
  'px-4 py-4 rounded-sm font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-[#FFEA9E] border-b-2 border-[#FFEA9E]'

export function HomepageHeader({ avatarUrl, activePath }: HomepageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-[80px] px-4 md:px-[144px] py-[12px] bg-[rgba(16,20,23,0.8)] backdrop-blur-sm">
      {/* Left group: logo (gap 64px) + nav links (gap 24px) — A1.1 + A1.2–A1.5 */}
      <div className="flex items-center gap-[64px]">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/saa-logo.png"
            alt="Sun Annual Awards 2025"
            width={52}
            height={48}
            priority
            quality={100}
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-[24px]">
          {/* A1.2 — on homepage: NavScrollLink (smooth scroll to top); on other pages: regular Link */}
          {activePath ? (
            <Link href="/" className={NORMAL_NAV_CLASS}>
              About SAA 2025
            </Link>
          ) : (
            <NavScrollLink>About SAA 2025</NavScrollLink>
          )}

          {/* A1.3 — Awards Information: gold + underline when active */}
          <Link
            href="/awards-information"
            className={activePath === 'awards-information' ? ACTIVE_NAV_CLASS : NORMAL_NAV_CLASS}
          >
            Awards Information
          </Link>

          {/* A1.5 — Sun* Kudos: gold + underline when active */}
          <Link
            href="/sun-kudos"
            className={activePath === 'sun-kudos' ? ACTIVE_NAV_CLASS : NORMAL_NAV_CLASS}
          >
            Sun* Kudos
          </Link>
        </nav>
      </div>

      {/* Right group (gap 16px): A1.6 Bell → A1.7 Language → A1.8 Avatar
          Order confirmed from Figma design items: A1.6 (no.) < A1.7 < A1.8 */}
      <div className="flex items-center gap-[16px]">
        {/* A1.6 — Notification bell: 40×40px, hover bg + 4px radius (NOT circle) */}
        <button
          type="button"
          aria-label="Thông báo"
          className="w-10 h-10 flex items-center justify-center cursor-pointer text-white hover:bg-white/10 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]"
        >
          <NotificationBellIcon size={24} color="white" />
        </button>

        {/* A1.7 — Language selector */}
        <LanguageSelector />

        {/* A1.8 — Avatar: 40×40px circle */}
        <button
          type="button"
          aria-label="Tài khoản"
          className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden cursor-pointer hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <AccountIcon size={40} color="white" />
          )}
        </button>
      </div>
    </header>
  )
}
