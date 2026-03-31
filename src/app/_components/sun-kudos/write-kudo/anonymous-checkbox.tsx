'use client'

import { useTranslations } from 'next-intl'

interface AnonymousCheckboxProps {
  checked: boolean
  onToggle: (checked: boolean) => void
}

export function AnonymousCheckbox({ checked, onToggle }: AnonymousCheckboxProps) {
  const t = useTranslations('WriteKudo')
  return (
    <label className="flex cursor-pointer items-center gap-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-6 w-6 rounded-[var(--radius-btn-secondary)] border border-[var(--color-kudos-text-secondary)] bg-white accent-[var(--color-accent-gold)] cursor-pointer"
      />
      <span className="font-montserrat text-[22px] font-bold leading-7 text-[var(--color-kudos-text-secondary)]">
        {t('anonymousLabel')}
      </span>
    </label>
  )
}
