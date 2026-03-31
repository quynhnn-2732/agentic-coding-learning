'use client'

import { useEffect, useRef, useCallback } from 'react'
import { CloseIcon } from '@/app/_components/icons/close-icon'
import { WidgetPenIcon } from '@/app/_components/icons/widget-pen-icon'
import { RulesPanelContent } from '@/app/_components/sun-kudos/rules-panel-content'

interface RulesPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function RulesPanel({ isOpen, onClose }: RulesPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Reset scroll position on open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-panel-title"
      onKeyDown={handleKeyDown}
      className="fixed right-0 top-0 h-screen w-[553px] max-md:w-screen md:w-[450px] lg:w-[553px] bg-[var(--color-kudos-container-dark)] z-[60] flex flex-col justify-between p-[24px_40px_40px_40px] max-md:p-[16px_20px_20px_20px] animate-slide-in-right"
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-6">
        <h1
          id="rules-panel-title"
          className="font-montserrat font-bold text-[45px] leading-[52px] text-[var(--color-accent-gold)] max-md:text-[32px] max-md:leading-[40px]"
        >
          Thể lệ
        </h1>
        <RulesPanelContent />
      </div>

      <div className="flex gap-4 w-full pt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-4 py-4 bg-[var(--color-btn-kudos-bg)] border border-[var(--color-btn-kudos-border)] rounded-[var(--radius-fab-btn)] cursor-pointer transition-all duration-150 hover:bg-[rgba(255,234,158,0.20)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent-gold)] focus-visible:outline-offset-2"
        >
          <CloseIcon size={24} color="white" />
          <span className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white">
            Đóng
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            // TODO: navigate to Viết Kudo form when Frame 520:11602 is implemented
            onClose()
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[var(--color-accent-gold)] rounded-[var(--radius-fab-btn)] h-14 cursor-pointer transition-all duration-150 hover:bg-[#F5E08E] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent-gold)] focus-visible:outline-offset-2"
        >
          <WidgetPenIcon />
          <span className="font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-bg-dark)]">
            Viết KUDOS
          </span>
        </button>
      </div>
    </div>
  )
}
