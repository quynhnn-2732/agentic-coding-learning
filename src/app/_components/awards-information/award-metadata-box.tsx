import { DiamondIcon } from '@/app/_components/icons/diamond-icon'
import { LicenseIcon } from '@/app/_components/icons/license-icon'

interface AwardMetadataQuantityProps {
  type: 'quantity'
  quantity: number
  unit: string
}

interface AwardMetadataPrizeProps {
  type: 'prize'
  prizeValue: string
  subtitle: string
}

type AwardMetadataBoxProps = AwardMetadataQuantityProps | AwardMetadataPrizeProps

const labelClass =
  'font-montserrat font-bold text-[24px] leading-[32px] text-[#FFEA9E]'
const valueClass = 'font-montserrat font-bold text-[36px] leading-[44px] text-white'
const unitClass = 'font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-white'

export function AwardMetadataBox(props: AwardMetadataBoxProps) {
  if (props.type === 'quantity') {
    return (
      <div className="flex flex-row items-center gap-[16px]">
        <DiamondIcon size={24} className="flex-shrink-0 text-[#FFEA9E]" />
        <span className={labelClass}>Số lượng giải thưởng:</span>
        <span className={valueClass}>{String(props.quantity).padStart(2, '0')}</span>
        <span className={unitClass}>{props.unit}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <LicenseIcon size={24} className="flex-shrink-0 text-[#FFEA9E]" />
        <span className={labelClass}>Giá trị giải thưởng:</span>
      </div>
      <span className={valueClass}>{props.prizeValue}</span>
      <span className={unitClass}>{props.subtitle}</span>
    </div>
  )
}
