'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { awardsData } from '@/libs/data/awards'
import { TargetIcon } from '@/app/_components/icons/target-icon'

export function AwardSidebar() {
  const t = useTranslations('AwardsInfo')
  const [activeSlug, setActiveSlug] = useState('top-talent')

  useEffect(() => {
    const sections = awardsData.map((a) => document.getElementById(a.slug))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id)
        })
      },
      { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' }
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function scrollTo(slug: string) {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      role="navigation"
      aria-label={t('awardCategories')}
      className="w-[178px] sticky top-[96px] self-start flex flex-col gap-[16px]"
    >
      {awardsData.map((award) => {
        const isActive = activeSlug === award.slug
        return (
          <button
            key={award.slug}
            type="button"
            onClick={() => scrollTo(award.slug)}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'flex items-center gap-[4px] p-[16px] text-left font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.25px] transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-accent-gold focus-visible:outline-offset-2',
              isActive
                ? 'text-[#FFEA9E] border-b border-[#FFEA9E]'
                : 'text-white rounded-[4px] hover:text-[rgba(255,234,158,0.7)]',
            ].join(' ')}
            style={isActive ? { textShadow: '0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287' } : undefined}
          >
            <TargetIcon size={24} className="flex-shrink-0" />
            {award.name}
          </button>
        )
      })}
    </nav>
  )
}
