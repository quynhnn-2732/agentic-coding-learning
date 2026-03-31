'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WidgetButton } from '@/app/_components/homepage/widget-button'
import { WriteKudoModal } from './write-kudo-modal'
import type { Hashtag } from '@/libs/types/kudos'

interface WriteKudoTriggerProps {
  initialHashtags: Hashtag[]
}

export function WriteKudoTrigger({ initialHashtags }: WriteKudoTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <WidgetButton onWriteKudo={() => setIsOpen(true)} />
      <WriteKudoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          setIsOpen(false)
          router.refresh()
        }}
        initialHashtags={initialHashtags}
      />
    </>
  )
}
