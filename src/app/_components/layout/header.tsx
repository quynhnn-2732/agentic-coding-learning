import Image from 'next/image'
import { LanguageSelector } from './language-selector'

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between h-[80px] px-[144px] py-[12px] bg-header-bg backdrop-blur-sm">
      {/* A.1_Logo — 52×48px native (3× asset for Retina), non-interactive */}
      <Image
        src="/images/saa-logo.png"
        alt="Sun Annual Awards 2025"
        width={52}
        height={48}
        priority
        quality={100}
      />
      {/* A.2_Language */}
      <LanguageSelector />
    </header>
  )
}
