'use client'

import { useTranslations } from 'next-intl'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function SunKudosError({ error, reset }: ErrorProps) {
  const t = useTranslations('ErrorPage')
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-dark)] px-4">
      <h2 className="font-montserrat text-2xl font-bold text-white mb-4">
        {t('title')}
      </h2>
      <p className="text-[var(--color-kudos-text-secondary)] mb-6 text-center max-w-md">
        {error.message || t('defaultMessage')}
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-6 py-3 rounded-[var(--radius-kudos-btn-gift)] font-montserrat font-bold text-base transition-colors duration-150 cursor-pointer"
        style={{
          backgroundColor: 'var(--color-accent-gold)',
          color: 'var(--color-bg-dark)',
        }}
      >
        {t('retry')}
      </button>
    </main>
  )
}
