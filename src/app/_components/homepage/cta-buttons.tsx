import Link from 'next/link'
import { ArrowIcon } from '@/app/_components/icons/arrow-icon'

const CTA_BASE =
  'flex items-center gap-sm px-[24px] py-[16px] rounded-md font-montserrat font-bold text-[22px] leading-[28px] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:outline-offset-[3px]'

export function CtaButtons() {
  return (
    <div className="flex flex-col md:flex-row gap-xl">
      <Link
        href="/awards-information"
        className={`${CTA_BASE} bg-[#FFEA9E] text-[#00101A] hover:opacity-90 active:scale-[0.98] active:opacity-80`}
      >
        ABOUT AWARDS
        <ArrowIcon size={24} color="#00101A" />
      </Link>
      <Link
        href="/sun-kudos"
        className={`${CTA_BASE} bg-[rgba(255,234,158,0.10)] text-white border border-[#998C5F] hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-[#FFEA9E] active:scale-[0.98] active:opacity-80`}
      >
        ABOUT KUDOS
        <ArrowIcon size={24} color="currentColor" />
      </Link>
    </div>
  )
}
