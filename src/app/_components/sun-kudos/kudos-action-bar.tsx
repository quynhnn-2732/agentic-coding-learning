import Link from 'next/link'

export function KudosActionBar() {
  const pillClass =
    'flex items-center gap-2 h-[56px] md:h-[72px] px-4 border rounded-[var(--radius-kudos-pill)] transition-colors duration-150 hover:bg-[var(--color-kudos-btn-hover)]'
  const pillStyle = {
    borderColor: 'var(--color-btn-kudos-border)',
    backgroundColor: 'var(--color-btn-kudos-bg)',
  }

  return (
    <div className="relative z-[1] flex flex-col md:flex-row gap-3 md:gap-[33px] px-4 md:px-[144px] mt-8 md:mt-[64px]">
      <Link href="/write-kudo" className={`${pillClass} flex-1 md:max-w-[738px]`} style={pillStyle}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="white"/>
        </svg>
        <span className="font-montserrat font-bold text-sm md:text-base leading-6 tracking-[0.15px] text-white">
          Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?
        </span>
      </Link>

      <button
        type="button"
        className={`${pillClass} md:w-[381px]`}
        style={pillStyle}
        aria-label="Tìm kiếm profile Sunner"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="white"/>
        </svg>
        <span className="font-montserrat font-bold text-sm md:text-base leading-6 tracking-[0.15px] text-white">
          Tìm kiếm profile Sunner
        </span>
      </button>
    </div>
  )
}
