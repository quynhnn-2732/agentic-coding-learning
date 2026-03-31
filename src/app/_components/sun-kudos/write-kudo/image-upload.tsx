'use client'

import { useRef } from 'react'
import { PlusIcon } from '../../icons/plus-icon'
import { CloseIcon } from '../../icons/close-icon'

interface UploadedImage {
  url: string
  filename: string
}

interface ImageUploadProps {
  images: UploadedImage[]
  onChange: (images: UploadedImage[]) => void
}

const MAX_IMAGES = 5
const MAX_SIZE_MB = 5
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      if (images.length >= MAX_IMAGES) break
      if (!ALLOWED_TYPES.includes(file.type)) continue
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue

      // Upload to API
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload/image', { method: 'POST', body: formData })
        if (res.ok) {
          const data = (await res.json()) as { url: string; filename: string }
          onChange([...images, { url: data.url, filename: data.filename }])
        }
      } catch {
        // Silently skip failed uploads
      }
    }

    // Reset input
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <span className="font-montserrat text-[22px] font-bold leading-7 text-[var(--color-bg-dark)]">
        Image
      </span>

      {/* Thumbnails */}
      {images.map((img, i) => (
        <div key={img.url} className="relative h-20 w-20">
          <img
            src={img.url}
            alt={img.filename}
            className="h-full w-full rounded object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemove(i)}
            aria-label={`Xóa ${img.filename}`}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-error)] text-white"
          >
            <CloseIcon size={12} color="white" />
          </button>
        </div>
      ))}

      {/* Add button */}
      {images.length < MAX_IMAGES && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-12 items-center gap-2 rounded-[var(--radius-kudos-btn-gift)] border border-[var(--color-btn-kudos-border)] bg-white px-2 py-1"
          >
            <PlusIcon size={24} color="var(--color-bg-dark)" />
            <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[var(--color-kudos-text-secondary)]">
              Image
              <br />
              Tối đa 5
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </>
      )}
    </div>
  )
}
