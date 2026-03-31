'use client'

import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '../../icons/close-icon'
import { SentArrowIcon } from '../../icons/sent-arrow-icon'
import { RecipientSearch } from './recipient-search'
import { TitleInput } from './title-input'
import { RichTextEditor } from './rich-text-editor'
import { HashtagSelector } from './hashtag-selector'
import { ImageUpload } from './image-upload'
import { AnonymousCheckbox } from './anonymous-checkbox'
import type { Hashtag, KudoFormState } from '@/libs/types/kudos'

interface WriteKudoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialHashtags: Hashtag[]
}

export function WriteKudoModal({
  isOpen,
  onClose,
  onSuccess,
  initialHashtags,
}: WriteKudoModalProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [formState, setFormState] = useState<KudoFormState>({
    recipient: null,
    title: '',
    body: '',
    selectedHashtags: [],
    images: [],
    isAnonymous: false,
    isSubmitting: false,
    errors: {},
  })

  const isFormValid =
    formState.recipient !== null &&
    formState.title.trim().length > 0 &&
    formState.body.trim().length > 0 &&
    formState.selectedHashtags.length > 0

  const handleSubmit = async () => {
    // Validate
    const errors: KudoFormState['errors'] = {}
    if (!formState.recipient) errors.recipient = 'Người nhận là bắt buộc'
    if (!formState.title.trim()) errors.title = 'Danh hiệu là bắt buộc'
    if (!formState.body.trim() || formState.body === '<p></p>') errors.body = 'Nội dung là bắt buộc'
    if (formState.selectedHashtags.length === 0) errors.hashtags = 'Chọn ít nhất 1 hashtag'

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }))
      return
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, errors: {} }))

    try {
      const res = await fetch('/api/kudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient_id: formState.recipient!.id,
          title: formState.title.trim(),
          body: formState.body,
          hashtag_ids: formState.selectedHashtags.map((h) => h.id),
          image_urls: formState.images.map((img) => img.url),
          is_anonymous: formState.isAnonymous,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit')
      }

      onSuccess()
    } catch {
      setFormState((prev) => ({ ...prev, isSubmitting: false }))
      // TODO: Show toast notification on error
    }
  }

  const handleClose = useCallback(() => {
    if (formState.isSubmitting) return
    setFormState({
      recipient: null,
      title: '',
      body: '',
      selectedHashtags: [],
      images: [],
      isAnonymous: false,
      isSubmitting: false,
      errors: {},
    })
    onClose()
  }, [onClose, formState.isSubmitting])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  if (!isOpen || !mounted) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-dark)]/80"
      data-testid="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-kudo-title"
        className="relative flex w-[752px] max-h-[90vh] flex-col gap-8 overflow-y-auto rounded-[var(--radius-kudos-card)] bg-[var(--color-kudos-card-bg)] p-10 max-md:w-full max-md:rounded-none max-md:p-6 md:max-lg:w-[90vw] md:max-lg:max-w-[752px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2
          id="write-kudo-title"
          className="text-center font-montserrat text-[32px] font-bold leading-10 text-[var(--color-bg-dark)]"
        >
          Gửi lời cám ơn và ghi nhận đến đồng đội
        </h2>

        {/* Recipient Search */}
        <RecipientSearch
          value={formState.recipient ? { id: formState.recipient.id, name: formState.recipient.name, avatar_url: formState.recipient.avatar_url } : null}
          onChange={(user) =>
            setFormState((prev) => ({
              ...prev,
              recipient: user
                ? { id: user.id, name: user.name, avatar_url: user.avatar_url, department: '', star_count: 0, title: null }
                : null,
              errors: { ...prev.errors, recipient: undefined },
            }))
          }
          error={formState.errors.recipient}
        />

        {/* Danh hiệu (Title) */}
        <TitleInput
          value={formState.title}
          onChange={(val) =>
            setFormState((prev) => ({
              ...prev,
              title: val,
              errors: { ...prev.errors, title: undefined },
            }))
          }
          error={formState.errors.title}
        />

        {/* Rich Text Editor */}
        <div className="relative">
          <RichTextEditor
            value={formState.body}
            onChange={(html) =>
              setFormState((prev) => ({
                ...prev,
                body: html,
                errors: { ...prev.errors, body: undefined },
              }))
            }
            error={formState.errors.body}
          />
        </div>

        {/* Hashtag Selector */}
        <HashtagSelector
          hashtags={initialHashtags}
          selected={formState.selectedHashtags}
          onSelectionChange={(hashtags) =>
            setFormState((prev) => ({
              ...prev,
              selectedHashtags: hashtags,
              errors: { ...prev.errors, hashtags: undefined },
            }))
          }
          error={formState.errors.hashtags}
        />

        {/* Image Upload */}
        <ImageUpload
          images={formState.images}
          onChange={(images) =>
            setFormState((prev) => ({ ...prev, images }))
          }
        />

        {/* Anonymous Checkbox */}
        <AnonymousCheckbox
          checked={formState.isAnonymous}
          onToggle={(checked) =>
            setFormState((prev) => ({ ...prev, isAnonymous: checked }))
          }
        />

        {/* Action Buttons */}
        <div className="flex flex-row gap-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-2 self-stretch rounded-[var(--radius-btn-secondary)] border border-[var(--color-btn-kudos-border)] bg-[var(--color-btn-kudos-bg)] px-10 py-4 font-montserrat text-base font-bold text-[var(--color-bg-dark)] transition-colors duration-150 hover:bg-[var(--color-kudos-btn-hover)]"
          >
            Hủy
            <CloseIcon size={24} />
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || formState.isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-kudos-btn-gift)] bg-[var(--color-accent-gold)] py-4 font-montserrat text-[22px] font-bold text-[var(--color-bg-dark)] transition-colors duration-150 hover:bg-[var(--color-accent-gold-glow)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formState.isSubmitting ? 'Đang gửi...' : 'Gửi'}
            {!formState.isSubmitting && <SentArrowIcon size={24} />}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
