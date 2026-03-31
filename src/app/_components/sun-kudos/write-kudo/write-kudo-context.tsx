'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { WriteKudoModal } from './write-kudo-modal'
import type { Hashtag } from '@/libs/types/kudos'

interface WriteKudoContextValue {
  openWriteKudo: () => void
}

const WriteKudoContext = createContext<WriteKudoContextValue>({
  openWriteKudo: () => {},
})

export function useWriteKudo() {
  return useContext(WriteKudoContext)
}

export function WriteKudoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const router = useRouter()

  const openWriteKudo = useCallback(async () => {
    try {
      const res = await fetch('/api/hashtags')
      if (res.ok) {
        const data: Hashtag[] = await res.json()
        setHashtags(data)
      }
    } catch {
      // Open modal even if hashtags fail to load
    }
    setIsOpen(true)
  }, [])

  return (
    <WriteKudoContext.Provider value={{ openWriteKudo }}>
      {children}
      <WriteKudoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          setIsOpen(false)
          router.refresh()
        }}
        initialHashtags={hashtags}
      />
    </WriteKudoContext.Provider>
  )
}
