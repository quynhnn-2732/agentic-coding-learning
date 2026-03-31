'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { WidgetPenIcon } from '@/app/_components/icons/widget-pen-icon'
import { WidgetSaaIcon } from '@/app/_components/icons/widget-saa-icon'
import { CloseIcon } from '@/app/_components/icons/close-icon'
import { RulesPanel } from '@/app/_components/sun-kudos/rules-panel'

interface WidgetButtonProps {
  onWriteKudo?: () => void
}

export function WidgetButton({ onWriteKudo }: WidgetButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    fabRef.current?.focus()
  }, [])

  // Click-outside handler
  useEffect(() => {
    if (!isMenuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(e.target as Node)
      ) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, closeMenu])

  // Escape key handler
  useEffect(() => {
    if (!isMenuOpen) return
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen, closeMenu])

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        aria-label="Thao tác nhanh"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((v) => !v)}
        className="fixed bottom-10 right-[19px] w-[106px] h-16 rounded-full bg-[#FFEA9E] flex items-center justify-center gap-[8px] z-50 transition-all duration-200 ease-out hover:scale-[1.04] active:scale-[0.97] active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00101A] [box-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] hover:[box-shadow:0_8px_16px_rgba(0,0,0,0.4),0_0_12px_#FAE287]"
      >
        <WidgetPenIcon />
        <WidgetSaaIcon />
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          role="menu"
          className="fixed bottom-10 right-[19px] z-50 flex flex-col items-end gap-[var(--spacing-fab-expanded-gap)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsRulesOpen(true)
              setIsMenuOpen(false)
            }}
            className="w-[149px] h-16 bg-[var(--color-accent-gold)] rounded-[var(--radius-fab-btn)] flex items-center gap-2 px-4 font-montserrat font-bold text-2xl leading-8 text-[var(--color-bg-dark)] cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#F5E08E] hover:[box-shadow:0_2px_8px_0_rgba(0,0,0,0.2)] active:bg-[#EBD67E] active:scale-[0.98] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent-gold)] focus-visible:outline-offset-2"
          >
            <WidgetSaaIcon />
            <span>Thể lệ</span>
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsMenuOpen(false)
              onWriteKudo?.()
            }}
            className="w-[214px] h-16 bg-[var(--color-accent-gold)] rounded-[var(--radius-fab-btn)] flex items-center gap-2 px-4 font-montserrat font-bold text-2xl leading-8 text-[var(--color-bg-dark)] cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#F5E08E] hover:[box-shadow:0_2px_8px_0_rgba(0,0,0,0.2)] active:bg-[#EBD67E] active:scale-[0.98] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent-gold)] focus-visible:outline-offset-2"
          >
            <WidgetPenIcon />
            <span>Viết KUDOS</span>
          </button>

          <button
            type="button"
            role="menuitem"
            aria-label="Đóng menu"
            onClick={closeMenu}
            className="w-14 h-14 bg-[var(--color-fab-close)] rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#B8221A] active:bg-[#9E1D16] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-fab-close)] focus-visible:outline-offset-2"
          >
            <CloseIcon color="white" />
          </button>
        </div>
      )}

      <RulesPanel
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </>
  )
}
