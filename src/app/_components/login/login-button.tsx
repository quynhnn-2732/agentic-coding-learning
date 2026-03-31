'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { signInWithGoogle } from '@/libs/auth/actions'
import { GoogleIcon } from '@/app/_components/icons/google-icon'

interface LoginButtonProps {
  onError: (message: string) => void
}

export function LoginButton({ onError }: LoginButtonProps) {
  const t = useTranslations('Login')
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    setIsLoading(true)
    try {
      const result = await signInWithGoogle()
      if ('url' in result) {
        window.location.href = result.url
      } else {
        setIsLoading(false)
        onError(result.error)
      }
    } catch {
      setIsLoading(false)
      onError(t('loginFailed'))
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      className={[
        'flex items-center w-[305px] h-[60px] px-[24px]',
        isLoading ? 'justify-center' : 'justify-between',
        'bg-btn-login-bg text-btn-login-text',
        'rounded-lg',
        'font-montserrat font-bold text-[22px] leading-7',
        'transition-transform duration-200 ease-out',
        'hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)]',
        'focus:outline-none focus:ring-2 focus:ring-btn-login-bg focus:ring-offset-3 focus:ring-offset-bg-dark',
        'disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0',
      ].join(' ')}
    >
      {isLoading ? (
        <svg
          className="animate-spin"
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 10a6 6 0 016-6V2a8 8 0 00-8 8h2z"
          />
        </svg>
      ) : (
        <>
          <span>{t('loginWithGoogle')}</span>
          <GoogleIcon size={24} />
        </>
      )}
    </button>
  )
}
