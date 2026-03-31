'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { VnFlagIcon } from '@/app/_components/icons/vn-flag-icon'
import { GbFlagIcon } from '@/app/_components/icons/gb-flag-icon'
import { ChevronDownIcon } from '@/app/_components/icons/chevron-down-icon'

const LOCALES = [
  { code: 'vi', label: 'VN' },
  { code: 'en', label: 'EN' },
]

function FlagIcon({ code, size = 24 }: { code: string; size?: number }) {
  return code === 'en' ? <GbFlagIcon size={size} /> : <VnFlagIcon size={size} />
}

export function LanguageSelector() {
  const currentLocale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(currentLocale)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  // Sync selected state when locale changes (after router.refresh())
  useEffect(() => {
    setSelected(currentLocale)
  }, [currentLocale])
  const containerRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])
  const triggerRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const t = useTranslations('Language')

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
      setFocusedIndex(-1)
      triggerRef.current?.focus()
    }
    if (!isOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(focusedIndex + 1, LOCALES.length - 1)
      setFocusedIndex(next)
      optionRefs.current[next]?.focus()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = Math.max(focusedIndex - 1, 0)
      setFocusedIndex(prev)
      optionRefs.current[prev]?.focus()
    }
  }

  function selectLocale(code: string) {
    setSelected(code)
    document.cookie = `locale=${code}; path=/; max-age=31536000; SameSite=Lax`
    setIsOpen(false)
    router.refresh()
  }

  const selectedLocale = LOCALES.find((l) => l.code === selected) ?? LOCALES[0]

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => {
          setIsOpen((v) => !v)
          setFocusedIndex(-1)
        }}
        className="flex items-center gap-[4px] text-text-white font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] rounded-sm hover:bg-white/10 transition-colors duration-150"
      >
        <FlagIcon code={selected} size={24} />
        <span>{selectedLocale.label}</span>
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
          className="absolute right-0 top-full mt-1 p-1.5 rounded-lg bg-[var(--Details-Container-2,#00070C)] border border-[var(--Details-Border,#998C5F)] shadow-lg z-20"
        >
          {LOCALES.map((locale, index) => (
            <li
              key={locale.code}
              ref={(el) => { optionRefs.current[index] = el }}
              role="option"
              aria-selected={selected === locale.code}
              onClick={() => selectLocale(locale.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  selectLocale(locale.code)
                }
              }}
              tabIndex={focusedIndex === index ? 0 : -1}
              className={`w-[110px] h-14 p-4 flex items-center gap-1 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,234,158,0.1)] focus:outline-none focus:ring-2 focus:ring-[#FFEA9E] focus:ring-offset-2 ${
                selected === locale.code
                  ? 'bg-[rgba(255,234,158,0.2)] rounded-sm'
                  : 'bg-transparent'
              }`}
            >
              <FlagIcon code={locale.code} size={24} />
              {locale.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
