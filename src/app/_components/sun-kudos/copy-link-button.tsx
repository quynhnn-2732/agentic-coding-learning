'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { CopyLinkIcon } from '@/app/_components/icons/copy-link-icon'
import { Toast } from '@/app/_components/sun-kudos/toast'

interface CopyLinkButtonProps {
  kudoId: string
}

function fallbackCopy(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  document.execCommand('copy')
  document.body.removeChild(ta)
}

export function CopyLinkButton({ kudoId }: CopyLinkButtonProps) {
  const t = useTranslations('CopyLink')
  const [showToast, setShowToast] = useState(false)

  const handleCopy = useCallback(async () => {
    const url = `${window.location.origin}/kudos/${kudoId}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      fallbackCopy(url)
    }
    setShowToast(true)
  }, [kudoId])

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1 p-4 rounded-[var(--radius-sm)] transition-colors duration-150 hover:bg-[rgba(255,234,158,0.10)]"
        aria-label={t('ariaLabel')}
      >
        <span className="font-montserrat font-bold text-sm text-[#00101A]">{t('text')}</span>
        <CopyLinkIcon size={24} color="#00101A" />
      </button>
      {showToast && (
        <Toast message={t('copied')} onDismiss={() => setShowToast(false)} />
      )}
    </>
  )
}
