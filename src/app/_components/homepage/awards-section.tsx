import { getTranslations } from 'next-intl/server'
import { awardsData } from '@/libs/data/awards'
import { AwardCard } from './award-card'

export async function AwardsSection() {
  const t = await getTranslations('Homepage')

  return (
    <section className="flex flex-col gap-[80px] px-4 md:px-[144px] max-w-[calc(1224px+288px)] mx-auto w-full">
      {/* C1_Header */}
      <div className="flex flex-col gap-[16px]">
        <p className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
          {t('saaSubtitle')}
        </p>
        <div className="h-px bg-[#2E3940] w-full" />
        <div className="flex flex-row">
          <h2 className="font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E] w-full lg:w-[637px]">
            {t('awardsHeading')}
          </h2>
        </div>
      </div>

      {/* C2_Award Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-[repeat(3,336px)] lg:gap-x-[108px] lg:gap-y-20">
        {awardsData.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </section>
  )
}
