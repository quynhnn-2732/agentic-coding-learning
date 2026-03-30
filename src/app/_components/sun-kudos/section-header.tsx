interface SectionHeaderProps {
  subtitle?: string
  title: string
}

export function SectionHeader({ subtitle = 'Sun* Annual Awards 2025', title }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-4 md:px-[144px]">
      <p className="font-montserrat font-bold text-lg md:text-[24px] leading-[32px] text-white">
        {subtitle}
      </p>
      <div className="h-px" style={{ backgroundColor: 'var(--color-divider)' }} />
      <h2
        className="font-montserrat font-bold text-[32px] md:text-[57px] leading-[40px] md:leading-[64px] tracking-[-0.25px]"
        style={{ color: 'var(--color-accent-gold)' }}
      >
        {title}
      </h2>
    </div>
  )
}
