'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
