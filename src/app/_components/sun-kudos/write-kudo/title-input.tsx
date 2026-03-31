'use client'

import { useTranslations } from 'next-intl'

interface TitleInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function TitleInput({ value, onChange, error }: TitleInputProps) {
  const t = useTranslations('WriteKudo')
  const borderClass = error
    ? 'border-[var(--color-error)]'
    : 'border-[var(--color-btn-kudos-border)] focus:border-[var(--color-focus-ring)]'

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-4 max-md:flex-col max-md:items-start">
        <label
          htmlFor="kudo-title"
          className="flex items-center gap-0.5 font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)] whitespace-nowrap"
        >
          {t('titleLabel')}
          <span className="text-[var(--color-required)]">*</span>
        </label>
        <input
          id="kudo-title"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('titlePlaceholder')}
          maxLength={200}
          className={`h-14 flex-1 w-full rounded-[var(--radius-kudos-btn-gift)] bg-white px-6 py-4 font-montserrat text-base font-bold leading-6 text-[var(--color-bg-dark)] placeholder:text-[var(--color-kudos-text-secondary)] border ${borderClass} outline-none transition-colors duration-150 focus:shadow-[0_0_0_2px_rgba(255,234,158,0.3)]`}
        />
      </div>
      <p className="font-montserrat text-base font-bold leading-6 text-[var(--color-kudos-text-secondary)] max-md:pl-0 md:pl-[calc(139px+16px)]">
        {t('titleHint')}
      </p>
    </div>
  )
}
