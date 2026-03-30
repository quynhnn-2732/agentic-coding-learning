'use client'

import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-kudos-card-bg)] text-[#00101A] rounded-lg px-6 py-3 shadow-lg font-montserrat font-bold text-sm animate-[fadeSlideUp_0.3s_ease-out]"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
