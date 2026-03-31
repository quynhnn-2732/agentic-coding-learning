'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { AccountIcon } from '@/app/_components/icons/account-icon'
import { ChevronRightIcon } from '@/app/_components/icons/chevron-right-icon'
import { Toast } from '@/app/_components/sun-kudos/toast'
import { createClient as createBrowserClient } from '@/libs/supabase/client'

interface ProfileDropdownProps {
  avatarUrl?: string
}

export function ProfileDropdown({ avatarUrl }: ProfileDropdownProps) {
  const t = useTranslations('ProfileDropdown')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuItemRefs = useRef<(HTMLElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const router = useRouter()
  const pathname = usePathname()

  const isProfileActive = pathname.startsWith('/profile')

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
    setFocusedIndex(-1)
    triggerRef.current?.focus()
  }, [])

  // Multi-tab session detection
  useEffect(() => {
    const supabase = createBrowserClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_OUT') {
          setIsOpen(false)
          router.push('/login')
          router.refresh()
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [router])

  // Click-outside detection (LanguageSelector pattern)
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  function handleTriggerClick() {
    setIsOpen((v) => !v)
    setFocusedIndex(-1)
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        closeDropdown()
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => {
          const next = prev < 1 ? prev + 1 : prev
          menuItemRefs.current[next]?.focus()
          return next
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : prev
          menuItemRefs.current[next]?.focus()
          return next
        })
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  function handleProfileClick() {
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  function handleProfileKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleProfileClick()
      router.push('/profile')
    }
  }

  async function handleLogoutClick() {
    console.log('Logging out...')
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      // Use browser client to sign out — clears auth cookies directly on the client
      const supabase = createBrowserClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
        setToastMessage(error.message)
        setIsLoggingOut(false)
        return
      }
      // Hard redirect to fully reload and let middleware handle unauthenticated state
      window.location.href = '/login'
    } catch {
      setToastMessage(t('unexpectedError'))
      setIsLoggingOut(false)
    }
  }

  function handleLogoutKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleLogoutClick()
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger — avatar button (A1.8) */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={t('account')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleTriggerClick}
        className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden cursor-pointer hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <AccountIcon size={40} color="white" />
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          aria-label={t('profileMenu')}
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full mt-1 z-50 flex flex-col p-1.5 bg-[var(--color-kudos-container-dark)] border border-[var(--color-btn-kudos-border)] rounded-lg transition-all duration-150 ease-out"
        >
          {/* Profile item */}
          <Link
            href="/profile"
            onClick={handleProfileClick}
            className="contents"
            tabIndex={-1}
          >
            <span
              ref={(el) => { menuItemRefs.current[0] = el }}
              role="menuitem"
              tabIndex={0}
              onKeyDown={handleProfileKeyDown}
              className={`flex items-center gap-1 w-full p-4 rounded cursor-pointer transition-colors duration-150 focus:outline-2 focus:outline-[#FFEA9E] focus:-outline-offset-2 ${
                isProfileActive
                  ? 'bg-[rgba(255,234,158,0.1)] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]'
                  : 'hover:bg-[rgba(255,234,158,0.1)]'
              }`}
            >
              <span className="font-montserrat text-base font-bold text-white tracking-[0.15px] leading-6">
                {t('profile')}
              </span>
              <AccountIcon size={24} color="#FFEA9E" />
            </span>
          </Link>

          {/* Logout item */}
          <span
            ref={(el) => { menuItemRefs.current[1] = el }}
            role="menuitem"
            tabIndex={0}
            onClick={handleLogoutClick}
            onKeyDown={handleLogoutKeyDown}
            className={`flex items-center gap-1 w-full p-4 rounded cursor-pointer transition-colors duration-150 focus:outline-2 focus:outline-[#FFEA9E] focus:-outline-offset-2 hover:bg-[rgba(255,234,158,0.1)] ${
              isLoggingOut ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <span className="font-montserrat text-base font-bold text-white tracking-[0.15px] leading-6">
              {t('logout')}
            </span>
            <ChevronRightIcon size={24} color="#FFEA9E" />
          </span>
        </div>
      )}

      {/* Error toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}
