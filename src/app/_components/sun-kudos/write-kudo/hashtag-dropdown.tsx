'use client'

import { useEffect, useRef } from 'react'
import { CheckCircleIcon } from '../../icons/check-circle-icon'
import type { Hashtag } from '@/libs/types/kudos'

interface HashtagDropdownProps {
  hashtags: Hashtag[]
  selected: Hashtag[]
  onToggle: (hashtag: Hashtag) => void
  onClose: () => void
}

export function HashtagDropdown({ hashtags, selected, onToggle, onClose }: HashtagDropdownProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const focusIndexRef = useRef(0)

  const selectedIds = new Set(selected.map((h) => h.id))
  const isMaxReached = selected.length >= 5

  // Click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      const items = listRef.current?.querySelectorAll('[role="option"]')
      if (!items) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        focusIndexRef.current = Math.min(focusIndexRef.current + 1, items.length - 1)
        ;(items[focusIndexRef.current] as HTMLElement).focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        focusIndexRef.current = Math.max(focusIndexRef.current - 1, 0)
        ;(items[focusIndexRef.current] as HTMLElement).focus()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        ;(items[focusIndexRef.current] as HTMLElement).click()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Chọn hashtag"
      aria-multiselectable="true"
      className="absolute left-0 top-full z-20 mt-1 flex w-[318px] flex-col rounded-[var(--radius-kudos-btn-gift)] border border-[var(--color-btn-kudos-border)] bg-[var(--color-kudos-container-dark)] p-1.5 max-h-[360px] overflow-y-auto"
    >
      {hashtags.map((hashtag) => {
        const isSelected = selectedIds.has(hashtag.id)
        const isDisabled = isMaxReached && !isSelected

        return (
          <button
            key={hashtag.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => onToggle(hashtag)}
            className={`flex h-10 w-full items-center justify-between px-4 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white transition-colors duration-100 ${
              isSelected
                ? 'rounded-sm bg-[var(--color-hashtag-selected)]'
                : 'bg-transparent hover:bg-[rgba(255,234,158,0.1)]'
            } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <span>#{hashtag.name}</span>
            {isSelected && <CheckCircleIcon size={24} color="white" />}
          </button>
        )
      })}
    </div>
  )
}
