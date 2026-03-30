import Image from 'next/image'
import type { AwardDetail } from '@/libs/types/homepage'
import { AwardContentBlock } from './award-content-block'

interface AwardEntryProps {
  award: AwardDetail
  imagePosition: 'left' | 'right'
}

export function AwardEntry({ award, imagePosition }: AwardEntryProps) {
  const imageEl = (
    <Image
      src={award.imageUrl}
      alt={`${award.name} award`}
      width={336}
      height={336}
      className="flex-shrink-0 w-full max-w-[280px] md:max-w-none md:w-[336px] md:h-[336px]"
    />
  )

  const contentEl = (
    <AwardContentBlock
      name={award.name}
      description={award.description}
      quantity={award.quantity}
      unit={award.unit}
      prizeValue={award.prizeValue}
    />
  )

  return (
    <section id={award.slug}>
      <div className="flex flex-col md:flex-row gap-[var(--spacing-xl)] items-start">
        {imagePosition === 'left' ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {imageEl}
          </>
        )}
      </div>
    </section>
  )
}
