'use client'

import { useState, useRef, useEffect } from 'react'
import { CloseIcon } from '../../icons/close-icon'
import { LinkIcon } from '../../icons/link-icon'

interface AddLinkDialogProps {
  initialText?: string
  onSave: (text: string, url: string) => void
  onCancel: () => void
}

export function AddLinkDialog({ initialText = '', onSave, onCancel }: AddLinkDialogProps) {
  const [text, setText] = useState(initialText)
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState<{ text?: string; url?: string }>({})
  const textInputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Auto-focus text input on open
  useEffect(() => {
    textInputRef.current?.focus()
  }, [])

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onCancel])

  const validate = (): boolean => {
    const newErrors: { text?: string; url?: string } = {}

    if (!text.trim()) {
      newErrors.text = 'Nội dung không được để trống'
    } else if (text.length > 100) {
      newErrors.text = 'Nội dung tối đa 100 ký tự'
    }

    if (!url.trim()) {
      newErrors.url = 'URL không được để trống'
    } else if (url.length > 2048) {
      newErrors.url = 'URL không được vượt quá 2048 ký tự'
    } else {
      try {
        const parsed = new URL(url)
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          newErrors.url = 'URL phải bắt đầu bằng http:// hoặc https://'
        }
      } catch {
        newErrors.url = 'URL phải bắt đầu bằng http:// hoặc https://'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      onSave(text.trim(), url.trim())
    }
  }

  const inputBorder = (fieldError?: string) =>
    fieldError
      ? 'border-[var(--color-error)]'
      : 'border-[var(--color-btn-kudos-border)] focus:border-[var(--color-focus-ring)]'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Thêm đường dẫn"
      className="absolute left-0 top-full z-20 mt-2 flex w-full flex-col gap-8 rounded-[var(--radius-kudos-card)] bg-[var(--color-kudos-card-bg)] p-10 shadow-lg max-md:p-6"
    >
      {/* Title */}
      <h3 className="font-montserrat text-[32px] font-bold leading-10 text-[var(--color-bg-dark)]">
        Thêm đường dẫn
      </h3>

      {/* Nội dung field */}
      <div className="flex flex-row items-center gap-4 max-md:flex-col max-md:items-start">
        <label className="font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)] whitespace-nowrap">
          Nội dung
        </label>
        <div className="flex-1 w-full">
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={(e) => { setText(e.target.value); setErrors((prev) => ({ ...prev, text: undefined })) }}
            maxLength={100}
            className={`h-14 w-full rounded-[var(--radius-kudos-btn-gift)] bg-white px-6 py-4 font-montserrat text-base font-bold leading-6 text-[var(--color-bg-dark)] border ${inputBorder(errors.text)} outline-none transition-colors duration-150 focus:shadow-[0_0_0_2px_rgba(255,234,158,0.3)]`}
          />
          {errors.text && (
            <p className="mt-1 font-montserrat text-sm text-[var(--color-error)]">{errors.text}</p>
          )}
        </div>
      </div>

      {/* URL field */}
      <div className="flex flex-row items-center gap-4 max-md:flex-col max-md:items-start">
        <label className="font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)] whitespace-nowrap">
          URL
        </label>
        <div className="relative flex-1 w-full">
          <input
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setErrors((prev) => ({ ...prev, url: undefined })) }}
            placeholder="https://"
            className={`h-14 w-full rounded-[var(--radius-kudos-btn-gift)] bg-white px-6 py-4 pr-12 font-montserrat text-base font-bold leading-6 text-[var(--color-bg-dark)] border ${inputBorder(errors.url)} outline-none transition-colors duration-150 focus:shadow-[0_0_0_2px_rgba(255,234,158,0.3)]`}
          />
          <LinkIcon size={24} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-bg-dark)]" />
          {errors.url && (
            <p className="mt-1 font-montserrat text-sm text-[var(--color-error)]">{errors.url}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 self-stretch rounded-[var(--radius-btn-secondary)] border border-[var(--color-btn-kudos-border)] bg-[var(--color-btn-kudos-bg)] px-10 py-4 font-montserrat text-base font-bold text-[var(--color-bg-dark)] transition-colors duration-150 hover:bg-[var(--color-kudos-btn-hover)]"
        >
          Hủy
          <CloseIcon size={24} />
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-kudos-btn-gift)] bg-[var(--color-accent-gold)] py-4 font-montserrat text-[22px] font-bold text-[var(--color-bg-dark)] transition-colors duration-150 hover:bg-[var(--color-accent-gold-glow)]"
        >
          Lưu
          <LinkIcon size={24} />
        </button>
      </div>
    </div>
  )
}
