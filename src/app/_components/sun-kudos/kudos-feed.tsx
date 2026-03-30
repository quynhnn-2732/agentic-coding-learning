'use client'

import { useState, useCallback } from 'react'
import type { Kudo } from '@/libs/types/kudos'
import { fetchKudosFeed } from '@/libs/data/kudos-queries'
import { KudoPostCard } from './kudo-post-card'

interface KudosFeedProps {
  initialKudos: Kudo[]
  initialHasMore: boolean
  onHashtagClick?: (tag: string) => void
}

export function KudosFeed({ initialKudos, initialHasMore, onHashtagClick }: KudosFeedProps) {
  const [kudos, setKudos] = useState<Kudo[]>(initialKudos)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      const nextPage = page + 1
      const result = await fetchKudosFeed(nextPage, 10)
      setKudos((prev) => [...prev, ...result.data])
      setHasMore(result.hasMore)
      setPage(nextPage)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, page])

  if (kudos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="font-montserrat text-lg text-white mb-4">
          Chưa có lời cảm ơn nào — hãy là người đầu tiên ghi nhận!
        </p>
        <a
          href="/write-kudo"
          className="px-6 py-3 rounded-[var(--radius-kudos-btn-gift)] font-montserrat font-bold text-base"
          style={{
            backgroundColor: 'var(--color-accent-gold)',
            color: 'var(--color-bg-dark)',
          }}
        >
          Ghi nhận ngay
        </a>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[var(--spacing-kudos-feed-gap)]" role="feed" aria-label="Danh sách Kudos">
      {kudos.map((kudo) => (
        <KudoPostCard key={kudo.id} kudo={kudo} onHashtagClick={onHashtagClick} />
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={loadMore}
          disabled={isLoading}
          className="self-center px-8 py-3 rounded-[var(--radius-kudos-btn-gift)] border font-montserrat font-bold text-base text-white transition-colors duration-150 cursor-pointer hover:bg-[var(--color-kudos-btn-hover)] disabled:opacity-50"
          style={{ borderColor: 'var(--color-btn-kudos-border)' }}
        >
          {isLoading ? 'Đang tải...' : 'Xem thêm'}
        </button>
      )}
    </div>
  )
}
