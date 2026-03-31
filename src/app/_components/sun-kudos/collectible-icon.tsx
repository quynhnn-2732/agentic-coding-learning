'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CollectibleIconProps {
  name: string
  imageSrc: string
}

export function CollectibleIcon({ name, imageSrc }: CollectibleIconProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2 w-20">
      {hasError ? (
        <div
          data-testid="icon-fallback"
          className="w-16 h-16 rounded-full bg-[#1a1a2e] border-2 border-white flex items-center justify-center"
        >
          <span className="font-montserrat font-bold text-[8px] text-white text-center leading-tight px-1">
            {name}
          </span>
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover rounded-full"
            onError={() => setHasError(true)}
          />
        </div>
      )}
      <span className="font-montserrat font-bold text-[11px] leading-4 tracking-[0.5px] text-white text-center w-20">
        {name}
      </span>
    </div>
  )
}
