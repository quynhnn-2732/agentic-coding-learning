'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDownIcon } from '../../icons/chevron-down-icon'

interface UserResult {
  id: string
  name: string
  avatar_url: string | null
}

interface RecipientSearchProps {
  value: UserResult | null
  onChange: (user: UserResult | null) => void
  error?: string
}

export function RecipientSearch({ value, onChange, error }: RecipientSearchProps) {
  const [query, setQuery] = useState(value?.name ?? '')
  const [results, setResults] = useState<UserResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchUsers = useCallback(async (q: string) => {
    if (q.trim().length < 1) {
      setResults([])
      setIsOpen(false)
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data = (await res.json()) as UserResult[]
        setResults(data)
        setIsOpen(data.length > 0)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (value) onChange(null)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchUsers(val), 300)
  }

  const handleSelect = (user: UserResult) => {
    onChange(user)
    setQuery(user.name)
    setIsOpen(false)
    setResults([])
  }

  // Click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  // Sync query with value prop
  useEffect(() => {
    if (value) setQuery(value.name)
  }, [value])

  const borderClass = error
    ? 'border-[var(--color-error)]'
    : 'border-[var(--color-btn-kudos-border)] focus-within:border-[var(--color-focus-ring)]'

  return (
    <div className="flex flex-row items-center gap-4 max-md:flex-col max-md:items-start" ref={containerRef}>
      <label className="flex items-center gap-0.5 font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)] whitespace-nowrap">
        Người nhận
        <span className="text-[var(--color-required)]">*</span>
      </label>

      <div className="relative flex-1 w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Tìm kiếm"
          className={`h-14 w-full rounded-[var(--radius-kudos-btn-gift)] bg-white px-6 py-4 font-montserrat text-base font-bold leading-6 text-[var(--color-bg-dark)] placeholder:text-[var(--color-kudos-text-secondary)] border ${borderClass} outline-none transition-colors duration-150`}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-bg-dark)]">
          <ChevronDownIcon size={24} />
        </span>

        {isOpen && results.length > 0 && (
          <ul className="absolute left-0 top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-[var(--color-btn-kudos-border)] bg-white shadow-lg">
            {results.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(user)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left font-montserrat text-base font-bold text-[var(--color-bg-dark)] hover:bg-[var(--color-hashtag-selected)] transition-colors"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-gold)] font-montserrat text-sm font-bold text-[var(--color-bg-dark)]">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span>{user.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {isOpen && results.length === 0 && !isLoading && query.trim().length > 0 && (
          <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-[var(--color-btn-kudos-border)] bg-white px-4 py-3 font-montserrat text-base text-[var(--color-kudos-text-secondary)]">
            Không tìm thấy kết quả
          </div>
        )}
      </div>
    </div>
  )
}
