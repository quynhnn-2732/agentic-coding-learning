'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { VnFlagIcon } from '@/app/_components/icons/vn-flag-icon'
import { ChevronDownIcon } from '@/app/_components/icons/chevron-down-icon'

const LOCALES = [
  { code: 'vi', label: 'VN' },
  { code: 'en', label: 'EN' },
]

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('vi')
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  function selectLocale(code: string) {
    setSelected(code)
    document.cookie = `locale=${code}; path=/; max-age=31536000; SameSite=Lax`
    setIsOpen(false)
    router.refresh()
  }

  const currentLocale = LOCALES.find((l) => l.code === selected) ?? LOCALES[0]

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-[4px] text-text-white font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] rounded-sm hover:bg-white/10 transition-colors duration-150"
      >
        <VnFlagIcon size={24} />
        <span>{currentLocale.label}</span>
        <span
          className={`transition-transform duration-150 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDownIcon size={24} />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-full mt-sm min-w-[80px] rounded-md bg-header-bg border border-divider py-xs shadow-lg z-20"
        >
          {LOCALES.map((locale) => (
            <li
              key={locale.code}
              role="option"
              aria-selected={selected === locale.code}
              onClick={() => selectLocale(locale.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') selectLocale(locale.code)
              }}
              tabIndex={0}
              className="px-md py-xs text-text-white font-montserrat text-base font-bold cursor-pointer hover:bg-white/10 focus:outline-none focus:bg-white/10"
            >
              {locale.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
