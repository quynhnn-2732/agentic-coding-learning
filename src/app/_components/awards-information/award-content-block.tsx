import type { AwardDetail } from '@/libs/types/homepage'
import { AwardMetadataBox } from './award-metadata-box'
import { TargetIcon } from '@/app/_components/icons/target-icon'

interface AwardContentBlockProps {
  name: string
  description: string
  quantity: number
  unit: AwardDetail['unit']
  prizeValue: AwardDetail['prizeValue']
}

export function AwardContentBlock({
  name,
  description,
  quantity,
  unit,
  prizeValue,
}: AwardContentBlockProps) {
  const isDualPrize = typeof prizeValue === 'object'

  return (
    <div className="w-full md:w-[480px] flex flex-col gap-[32px]">
      <h2 className="flex items-center gap-[8px] font-montserrat font-bold text-[24px] leading-[32px] text-[#FFEA9E]">
        <TargetIcon size={24} className="flex-shrink-0" />
        {name}
      </h2>
      <p className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white text-justify">
        {description}
      </p>
      {/* Divider — Rectangle 8 in Figma */}
      <div className="w-full h-px bg-[#2E3940]" />
      <AwardMetadataBox type="quantity" quantity={quantity} unit={unit} />
      {/* Divider — Rectangle 10 in Figma */}
      <div className="w-full h-px bg-[#2E3940]" />
      {isDualPrize ? (
        <div className="flex flex-col gap-[16px]">
          <AwardMetadataBox
            type="prize"
            prizeValue={prizeValue.individual}
            subtitle="cho giải cá nhân"
          />
          {/* "Hoặc" divider — left-aligned text with line to the right */}
          <div className="flex items-center gap-[12px]">
            <span className="font-montserrat text-[14px] leading-[20px] text-white/60 whitespace-nowrap">
              Hoặc
            </span>
            <div className="flex-1 h-px bg-divider" />
          </div>
          <AwardMetadataBox
            type="prize"
            prizeValue={prizeValue.team}
            subtitle="cho giải tập thể"
          />
        </div>
      ) : (
        <AwardMetadataBox type="prize" prizeValue={prizeValue} subtitle="cho mỗi giải thưởng" />
      )}
    </div>
  )
}
