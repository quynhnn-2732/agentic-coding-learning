'use client'

import Link from 'next/link'
import type { Kudo } from '@/libs/types/kudos'
import { KudoUserInfo } from './kudo-user-info'
import { CategoryTag } from './category-tag'
import { HeartButton } from './heart-button'
import { CopyLinkButton } from './copy-link-button'

interface HighlightKudoCardProps {
  kudo: Kudo
  isActive?: boolean
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

export function HighlightKudoCard({ kudo, isActive = false }: HighlightKudoCardProps) {
  const visibleHashtags = kudo.hashtags.slice(0, 5)

  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      style={{
        boxShadow: isActive
          ? 'rgba(255, 234, 158, 0.25) 0px 20px 60px'
          : 'none',
      }}
    >
      <article
        className="kudos-card flex flex-col rounded-2xl w-full overflow-hidden relative gap-4 h-auto min-h-[400px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[485px]"
        style={{
          backgroundColor: 'var(--color-kudos-card-bg)',
          border: '0.25rem solid var(--color-accent-gold)',
          padding: '24px 24px 16px 24px',
        }}
      >
        {/* Sender → Receiver */}
        <KudoUserInfo sender={kudo.sender} receiver={kudo.receiver} variant="highlight" />

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: 'var(--color-accent-gold)' }} />

        {/* Content zone */}
        <div className="flex flex-col gap-4">
          {/* Time */}
          <div className="w-full flex items-center">
            <span
              className="inline-block text-xs sm:text-sm md:text-sm lg:text-base font-normal leading-4 sm:leading-5 md:leading-5 lg:leading-6 tracking-[0.03125rem]"
              style={{ color: 'var(--color-kudos-text-secondary)' }}
            >
              {formatTime(kudo.created_at)}
            </span>
          </div>

          {/* Category tag */}
          <h3 className="text-center text-sm sm:text-base md:text-lg lg:text-base font-bold text-[#00101A] uppercase tracking-[0.03125rem]">
            {kudo.category_tag}
          </h3>

          {/* Content block — bordered golden box */}
          <div
            className="px-4 sm:px-5 md:px-6 lg:px-6 py-3 sm:py-4 md:py-4 lg:py-4 rounded-xl text-sm sm:text-base md:text-lg lg:text-[1.25rem] leading-[1.6] tracking-0 whitespace-pre-wrap font-montserrat font-normal text-[#00101A] line-clamp-3"
            style={{
              backgroundColor: 'var(--color-kudos-btn-hover)',
              border: '1px solid var(--color-accent-gold)',
            }}
          >
            {kudo.content}
          </div>

          {/* Hashtags — red color per production */}
          {visibleHashtags.length > 0 && (
            <div
              className="flex-wrap gap-1 text-xs sm:text-sm md:text-base lg:text-base leading-4 sm:leading-5 md:leading-6 lg:leading-6 tracking-[0.03125rem] line-clamp-1 font-montserrat font-normal"
              style={{
                color: 'rgb(212, 39, 29)',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {visibleHashtags.map((tag, idx) => {
                const label = tag.startsWith('#') ? tag : `#${tag}`
                return (
                  <span key={`${tag}-${idx}`} className="mr-2">
                    {label} &nbsp;
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: 'var(--color-accent-gold)' }} />

        {/* Action bar */}
        <div className="flex items-center justify-between">
          <HeartButton
            kudoId={kudo.id}
            initialCount={kudo.heart_count}
            initialIsHearted={kudo.is_hearted}
          />
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <CopyLinkButton kudoId={kudo.id} />
            <Link
              href={`/kudos/${kudo.id}`}
              className="flex items-center gap-1 px-3 sm:px-4 md:px-4 lg:px-4 py-3 sm:py-3 md:py-4 lg:py-4 rounded transition-all hover:bg-[rgba(255,234,158,0.2)]"
            >
              <span className="text-xs sm:text-sm md:text-base lg:text-base font-medium leading-4 sm:leading-5 md:leading-6 lg:leading-6 tracking-[0.009375rem] font-montserrat text-[#00101A]">
                Xem chi tiết
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#00101A" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
