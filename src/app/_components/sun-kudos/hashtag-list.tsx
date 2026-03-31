'use client'

interface HashtagListProps {
  hashtags: string[]
  onTagClick?: (tag: string) => void
}

export function HashtagList({ hashtags, onTagClick }: HashtagListProps) {
  if (!hashtags.length) return null

  const visible = hashtags.slice(0, 5)

  return (
    <div className="flex flex-row gap-7 overflow-hidden">
      {visible.map((tag) => {
        const label = tag.startsWith('#') ? tag : `#${tag}`
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick?.(tag)}
            className="font-montserrat font-bold text-base text-[#D4271D] tracking-[0.5px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
