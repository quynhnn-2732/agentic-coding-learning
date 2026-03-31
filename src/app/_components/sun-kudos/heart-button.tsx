'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { toggleHeart } from '@/libs/data/kudos-queries'

interface HeartButtonProps {
  kudoId: string
  initialCount: number
  initialIsHearted: boolean
}

export function HeartButton({ kudoId, initialCount, initialIsHearted }: HeartButtonProps) {
  const t = useTranslations('HeartButton')
  const [isHearted, setIsHearted] = useState(initialIsHearted)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = useCallback(async () => {
    if (isLoading) return

    const prevHearted = isHearted
    const prevCount = count

    // Optimistic update
    setIsHearted(!isHearted)
    setCount(isHearted ? count - 1 : count + 1)
    setIsLoading(true)

    try {
      const result = await toggleHeart(kudoId)
      setIsHearted(result.hearted)
      setCount(result.heart_count)
    } catch {
      // Rollback on failure
      setIsHearted(prevHearted)
      setCount(prevCount)
    } finally {
      setIsLoading(false)
    }
  }, [kudoId, isHearted, count, isLoading])

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center gap-1 cursor-pointer transition-transform duration-200 hover:scale-110 disabled:opacity-70"
      aria-label={isHearted ? t('unlike') : t('like')}
      aria-pressed={isHearted}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill={isHearted ? 'var(--color-kudos-heart-active)' : 'none'}
        stroke={isHearted ? 'var(--color-kudos-heart-active)' : 'var(--color-kudos-text-secondary)'}
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      <span
        className="font-montserrat font-bold text-base leading-6"
        style={{ color: isHearted ? 'var(--color-kudos-heart-active)' : 'var(--color-kudos-text-secondary)' }}
      >
        {count.toLocaleString()}
      </span>
    </button>
  )
}
