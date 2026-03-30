import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/app/_components/icons/arrow-icon'
import type { Award } from '@/libs/types/homepage'

interface AwardCardProps {
  award: Award
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <Link
      href={`/awards-information#${award.slug}`}
      className="flex flex-col gap-[24px] w-full lg:w-[336px] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00101A] rounded-[8px]"
    >
      {/* Card image */}
      <div
        className="relative w-full rounded-[8px] overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:[box-shadow:0_8px_24px_rgba(0,0,0,0.3),0_0_12px_rgba(250,226,135,0.25)]"
        style={{ aspectRatio: '1 / 1' }}
      >
        <Image
          src={award.imageUrl}
          alt={award.name}
          fill
          loading="lazy"
          quality={90}
          className="object-cover transition-all duration-300 ease-out group-hover:brightness-110"
          sizes="(max-width: 767px) calc(50vw - 16px), (max-width: 1023px) calc(50vw - 16px), 336px"
        />
      </div>

      {/* Card info */}
      <div className="flex flex-col gap-[4px]">
        <h3 className="font-montserrat font-normal text-[24px] leading-[32px] text-[#FFEA9E]">
          {award.name}
        </h3>
        <p className="font-montserrat font-normal text-[16px] leading-[24px] tracking-[0.5px] text-white line-clamp-2">
          {award.description}
        </p>
        <span className="flex items-center gap-[4px] font-montserrat font-medium text-[16px] leading-[24px] tracking-[0.15px] text-white mt-1">
          Chi tiết
          <ArrowIcon size={20} color="white" />
        </span>
      </div>
    </Link>
  )
}
