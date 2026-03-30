'use client'

import { useState } from 'react'
import { WidgetPenIcon } from '@/app/_components/icons/widget-pen-icon'
import { WidgetSaaIcon } from '@/app/_components/icons/widget-saa-icon'

export function WidgetButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button
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
        <div role="menu" className="fixed bottom-32 right-[19px] z-50" />
      )}
    </>
  )
}
