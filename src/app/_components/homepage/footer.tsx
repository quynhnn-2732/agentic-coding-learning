import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About SAA 2025', href: '/' },
  { label: 'Awards Information', href: '/awards-information' },
  { label: 'Sun* Kudos', href: '/sun-kudos' },
  { label: 'Tiêu chuẩn chung', href: '#' },
] as const

const NAV_LINK_CLASS =
  'font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.15px] text-white hover:text-[#FFEA9E] hover:underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]'

export function HomepageFooter() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-[24px] px-4 py-[40px] md:px-[90px] border-t border-[#2E3940]">
      {/* Logo */}
      <Image
        src="/images/saa-logo.png"
        alt="Sun Annual Awards 2025"
        width={52}
        height={48}
      />

      {/* Nav links */}
      <nav className="flex flex-wrap justify-center items-center gap-[40px] md:gap-[80px]">
        {NAV_LINKS.map(({ label, href }) => (
          <Link key={label} href={href} className={NAV_LINK_CLASS}>
            {label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <p className="font-montserrat-alt font-bold text-[16px] leading-[24px] text-white text-center md:text-right">
        Bản quyền thuộc về Sun* © 2025
      </p>
    </footer>
  )
}
