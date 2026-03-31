'use client'

import { useState } from 'react'
import { PlusIcon } from '../../icons/plus-icon'
import { CloseIcon } from '../../icons/close-icon'
import { HashtagDropdown } from './hashtag-dropdown'
import type { Hashtag } from '@/libs/types/kudos'

interface HashtagSelectorProps {
  hashtags: Hashtag[]
  selected: Hashtag[]
  onSelectionChange: (hashtags: Hashtag[]) => void
  error?: string
}

export function HashtagSelector({ hashtags, selected, onSelectionChange, error }: HashtagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (hashtag: Hashtag) => {
    const exists = selected.find((h) => h.id === hashtag.id)
    if (exists) {
      onSelectionChange(selected.filter((h) => h.id !== hashtag.id))
    } else if (selected.length < 5) {
      onSelectionChange([...selected, hashtag])
    }
  }

  const handleRemoveChip = (id: string) => {
    onSelectionChange(selected.filter((h) => h.id !== id))
  }

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <label className="flex items-center gap-0.5 font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)] whitespace-nowrap">
        Hashtag
        <span className="text-[var(--color-required)]">*</span>
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={`flex h-12 items-center gap-2 rounded-[var(--radius-kudos-btn-gift)] border bg-white px-2 py-1 ${
            error
              ? 'border-[var(--color-error)]'
              : 'border-[var(--color-btn-kudos-border)]'
          }`}
        >
          <PlusIcon size={24} color="var(--color-bg-dark)" />
          <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[var(--color-kudos-text-secondary)]">
            Hashtag
            <br />
            Tối đa 5
          </span>
        </button>

        {isOpen && (
          <HashtagDropdown
            hashtags={hashtags}
            selected={selected}
            onToggle={handleToggle}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* Chips */}
      {selected.map((hashtag) => (
        <span
          key={hashtag.id}
          className="flex items-center gap-1 rounded-full bg-[var(--color-hashtag-selected)] px-3 py-1 font-montserrat text-sm font-bold text-[var(--color-bg-dark)]"
        >
          #{hashtag.name}
          <button
            type="button"
            onClick={() => handleRemoveChip(hashtag.id)}
            aria-label={`Xóa #${hashtag.name}`}
            className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[var(--color-kudos-btn-hover)]"
          >
            <CloseIcon size={12} />
          </button>
        </span>
      ))}
    </div>
  )
}
