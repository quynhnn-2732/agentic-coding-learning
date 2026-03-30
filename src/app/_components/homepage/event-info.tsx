interface EventInfoProps {
  datetimeIso: string
  location: string
}

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d)
  } catch {
    return ''
  }
}

function formatTime(isoString: string): string {
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return ''
    const h = d.getHours().toString().padStart(2, '0')
    const m = d.getMinutes().toString().padStart(2, '0')
    return `${h}h${m}`
  } catch {
    return ''
  }
}

const LABEL = 'font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.15px] text-white'
const VALUE = 'font-montserrat font-bold text-[24px] leading-[32px] text-[#FFEA9E]'

export function EventInfo({ datetimeIso, location }: EventInfoProps) {
  const date = formatDate(datetimeIso)
  const time = formatTime(datetimeIso)

  return (
    <div className="flex flex-col gap-[8px]">
      {/* Row 1: time + venue */}
      <div className="flex flex-row flex-wrap gap-[60px]">
        <div className="flex items-baseline gap-[8px]">
          <span className={LABEL}>Thời gian:</span>
          {date && <span className={VALUE}>{date}</span>}
          {time && <span className={VALUE}>{time}</span>}
        </div>
        <div className="flex items-baseline gap-[8px]">
          <span className={LABEL}>Địa điểm:</span>
          <span className={VALUE}>{location}</span>
        </div>
      </div>
      {/* Row 2: livestream note */}
      <p className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white">
        Tường thuật trực tiếp qua sóng Livestream
      </p>
    </div>
  )
}
