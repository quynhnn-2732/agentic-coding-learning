import Image from 'next/image'

export function KudosBanner() {
  return (
    <div className="relative z-[1] flex flex-col gap-2.5 px-4 md:px-[144px] h-auto md:h-[160px]">
      <p
        className="font-montserrat italic text-[24px] md:text-[36px] font-bold leading-[32px] md:leading-[44px]"
        style={{ color: 'var(--color-accent-gold)' }}
      >
        Hệ thống ghi nhận và cảm ơn
      </p>
      <Image
        src="/images/sun-kudos/kudos-logo.svg"
        alt="Sun* Kudos"
        width={593}
        height={104}
        className="w-[300px] md:w-[593px] h-auto"
        priority
      />
    </div>
  )
}
