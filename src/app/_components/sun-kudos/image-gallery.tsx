import { PlayIcon } from '@/app/_components/icons/play-icon'

interface ImageGalleryProps {
  images: string[]
  videoUrl?: string | null
}

export function ImageGallery({ images, videoUrl }: ImageGalleryProps) {
  if (!images.length && !videoUrl) return null

  const visible = images.slice(0, 5)

  return (
    <div className="flex flex-row gap-4 h-[88px]">
      {visible.map((src, idx) => (
        <div key={`${src}-${idx}`} className="relative w-[88px] h-[88px] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Kudo image ${idx + 1}`}
            width={88}
            height={88}
            className="rounded-lg object-cover w-[88px] h-[88px] bg-[var(--color-kudos-text-secondary)]/20"
            loading="lazy"
          />
          {idx === 0 && videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg">
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                <PlayIcon size={24} color="white" />
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Video-only: no images but has video */}
      {!visible.length && videoUrl && (
        <div className="relative w-[88px] h-[88px] shrink-0 rounded-lg bg-black/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
            <PlayIcon size={24} color="white" />
          </div>
        </div>
      )}
    </div>
  )
}
