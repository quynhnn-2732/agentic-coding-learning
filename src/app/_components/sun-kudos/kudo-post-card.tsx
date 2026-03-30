'use client'

import Link from 'next/link'
import type { Kudo } from '@/libs/types/kudos'
import { KudoUserInfo } from './kudo-user-info'
import { CategoryTag } from './category-tag'
import { HashtagList } from './hashtag-list'
import { ImageGallery } from './image-gallery'
import { HeartButton } from './heart-button'
import { CopyLinkButton } from './copy-link-button'

interface KudoPostCardProps {
  kudo: Kudo
  onHashtagClick?: (tag: string) => void
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${hours}:${minutes} - ${month}/${day}/${year}`
}

export function KudoPostCard({ kudo, onHashtagClick }: KudoPostCardProps) {
  return (
    <article
      className="flex flex-col gap-[var(--spacing-kudos-card-gap)] w-full rounded-[var(--radius-kudos-card)] p-6 md:p-[40px_40px_16px_40px]"
      style={{ backgroundColor: 'var(--color-kudos-card-bg)' }}
    >
      {/* Sender → Receiver */}
      <KudoUserInfo sender={kudo.sender} receiver={kudo.receiver} />

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: 'var(--color-accent-gold)' }} />

      {/* Content zone */}
      <div className="flex flex-col gap-[var(--spacing-kudos-card-gap)]">
        {/* Time */}
        <p
          className="font-montserrat font-bold text-base leading-6 tracking-[0.5px]"
          style={{ color: 'var(--color-kudos-text-secondary)' }}
        >
          {formatTime(kudo.created_at)}
        </p>

        {/* Category tag */}
        <CategoryTag tag={kudo.category_tag} />

        {/* Content block */}
        <Link
          href={`/kudos/${kudo.id}`}
          className="block rounded-[var(--radius-kudos-content-block)] border p-4 md:px-6 md:py-4"
          style={{
            borderColor: 'var(--color-accent-gold)',
            backgroundColor: 'var(--color-kudos-btn-hover)',
          }}
        >
          <p className="font-montserrat text-base leading-6 text-[#00101A] line-clamp-5">
            {kudo.content}
          </p>
        </Link>

        {/* Image gallery */}
        <ImageGallery images={kudo.images} videoUrl={kudo.video_url} />

        {/* Hashtags */}
        <HashtagList hashtags={kudo.hashtags} onTagClick={onHashtagClick} />
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: 'var(--color-accent-gold)' }} />

      {/* Action bar */}
      <div className="flex items-center justify-between">
        <HeartButton
          kudoId={kudo.id}
          initialCount={kudo.heart_count}
          initialIsHearted={kudo.is_hearted}
        />
        <CopyLinkButton kudoId={kudo.id} />
      </div>
    </article>
  )
}
