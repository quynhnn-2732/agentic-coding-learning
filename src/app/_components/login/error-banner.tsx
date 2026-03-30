'use client'

import { useEffect } from 'react'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000)
    return () => clearTimeout(t)
  }, [message, onDismiss])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-center justify-between gap-md px-md py-sm rounded-md bg-error text-white font-montserrat text-sm font-semibold leading-5"
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Đóng thông báo lỗi"
        className="shrink-0 ml-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white rounded"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
