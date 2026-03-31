import Image from 'next/image'

const TIER_CONFIG = {
  new: { label: 'New Hero', image: '/images/rules/badge-new-hero.png' },
  rising: { label: 'Rising Hero', image: '/images/rules/badge-rising-hero.png' },
  super: { label: 'Super Hero', image: '/images/rules/badge-super-hero.png' },
  legend: { label: 'Legend Hero', image: '/images/rules/badge-legend-hero.png' },
} as const

interface HeroBadgeProps {
  tier: keyof typeof TIER_CONFIG
}

export function HeroBadge({ tier }: HeroBadgeProps) {
  const config = TIER_CONFIG[tier]
  const isLegend = tier === 'legend'

  return (
    <div
      className="relative inline-flex items-center justify-center w-[126px] h-[22px] border border-[var(--color-accent-gold)] rounded-[56px] overflow-hidden"
    >
      <Image
        src={config.image}
        alt={config.label}
        width={126}
        height={22}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span
        className={`relative z-10 font-montserrat font-bold text-[13px] leading-[19px] tracking-[0.094px] text-white ${
          isLegend ? '[text-shadow:0_0_1.5px_#FFF]' : '[text-shadow:0_0.5px_1.8px_#000]'
        }`}
      >
        {config.label}
      </span>
    </div>
  )
}
