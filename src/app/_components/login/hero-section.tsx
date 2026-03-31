'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { LoginSection } from './login-section'

interface HeroSectionProps {
  initialError?: string
}

export function HeroSection({ initialError }: HeroSectionProps) {
  const t = useTranslations('Login')
  return (
    <section className="absolute top-[88px] left-0 right-0 flex flex-col px-[144px] py-[96px] gap-[120px]">
      {/* Frame 487 — flex-col, gap: 80px */}
      <div className="flex flex-col items-start gap-[80px]">

        {/* B.1 ROOT FURTHER Key Visual — 451×200px */}
        <div className="relative w-[451px] h-[200px]">
          <Image
            src="/images/root-further-logo.png"
            alt=""
            fill
            sizes="451px"
            priority
            className="object-contain object-left"
          />
        </div>

        {/* Frame 550 — flex-col, gap: 24px, pl: 16px */}
        <div className="flex flex-col gap-[24px] pl-[16px]">

          {/* B.2_content — Montserrat 20px/700, line-height 40px, letter-spacing 0.5px */}
          <div className="font-montserrat font-bold text-[20px] leading-10 tracking-[0.5px] text-text-white">
            <p>{t('heroLine1')}</p>
            <p>{t('heroLine2')}</p>
          </div>

          {/* B.3 Login CTA */}
          <LoginSection initialError={initialError} />
        </div>
      </div>
    </section>
  )
}
