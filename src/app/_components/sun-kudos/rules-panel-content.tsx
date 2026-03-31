'use client'

import { useTranslations } from 'next-intl'
import { HeroBadge } from '@/app/_components/sun-kudos/hero-badge'
import { CollectibleIcon } from '@/app/_components/sun-kudos/collectible-icon'

const BADGE_TIERS = [
  { tier: 'new' as const, thresholdKey: 'tier1Count' as const, descriptionKey: 'tier1Desc' as const },
  { tier: 'rising' as const, thresholdKey: 'tier2Count' as const, descriptionKey: 'tier2Desc' as const },
  { tier: 'super' as const, thresholdKey: 'tier3Count' as const, descriptionKey: 'tier3Desc' as const },
  { tier: 'legend' as const, thresholdKey: 'tier4Count' as const, descriptionKey: 'tier4Desc' as const },
]

const COLLECTIBLE_ICONS = [
  { name: 'REVIVAL', imageSrc: '/images/rules/icon-revival.png' },
  { name: 'TOUCH OF LIGHT', imageSrc: '/images/rules/icon-touch-of-light.png' },
  { name: 'STAY GOLD', imageSrc: '/images/rules/icon-stay-gold.png' },
  { name: 'FLOW TO HORIZON', imageSrc: '/images/rules/icon-flow-to-horizon.png' },
  { name: 'BEYOND THE BOUNDARY', imageSrc: '/images/rules/icon-beyond-the-boundary.png' },
  { name: 'ROOT FURTHER', imageSrc: '/images/rules/icon-root-further.png' },
]

export function RulesPanelContent() {
  const t = useTranslations('RulesPanelContent')
  return (
    <div className="flex flex-col gap-4">
      {/* Section 1: Người nhận Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-[22px] leading-7 text-[var(--color-accent-gold)]">
          {t('heroTitle')}
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          {t('heroDesc')}
        </p>

        {BADGE_TIERS.map((tier) => (
          <div key={tier.tier} className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <HeroBadge tier={tier.tier} />
              <span className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white">
                {t(tier.thresholdKey)}
              </span>
            </div>
            <p className="font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-white text-justify">
              {t(tier.descriptionKey)}
            </p>
          </div>
        ))}
      </section>

      {/* Section 2: Người gửi Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-[22px] leading-7 text-[var(--color-accent-gold)]">
          {t('senderTitle')}
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          {t('senderDesc')}
        </p>

        <div className="flex flex-wrap gap-4 px-6 justify-between">
          {COLLECTIBLE_ICONS.map((icon) => (
            <CollectibleIcon key={icon.name} name={icon.name} imageSrc={icon.imageSrc} />
          ))}
        </div>

        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          {t('senderGift')}
        </p>
      </section>

      {/* Section 3: Kudos Quốc Dân */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat font-bold text-2xl leading-8 text-[var(--color-accent-gold)]">
          {t('nationalTitle')}
        </h2>
        <p className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify">
          {t('nationalDesc')}
        </p>
      </section>
    </div>
  )
}
