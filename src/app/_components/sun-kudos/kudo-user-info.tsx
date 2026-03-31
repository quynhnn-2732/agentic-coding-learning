'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SentArrowIcon } from '@/app/_components/icons/sent-arrow-icon'
import { useTranslations } from 'next-intl'
import type { KudoUser } from '@/libs/types/kudos'

interface KudoUserInfoProps {
  sender: KudoUser
  receiver: KudoUser
  variant?: 'feed' | 'highlight'
}

function UserBlock({ user }: { user: KudoUser }) {
  const t = useTranslations('KudoUserInfo')

  return (
    <Link href={`/profile/${user.id}`} className="flex flex-col items-center gap-1">
      {user.avatar_url ? (
        <Image
          src={user.avatar_url}
          alt={user.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-[var(--color-kudos-text-secondary)] flex items-center justify-center">
          <span className="font-montserrat font-bold text-base text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="font-montserrat font-bold text-sm text-[#00101A] text-center">
        {user.name}
      </span>
      <span className="font-montserrat text-xs text-[var(--color-kudos-text-secondary)] text-center">
        {user.department}
      </span>
      <span className="font-montserrat text-xs" style={{ color: 'var(--color-accent-gold)' }}>
        {t('stars', { count: user.star_count })}
      </span>
    </Link>
  )
}

export function KudoUserInfo({ sender, receiver, variant = 'feed' }: KudoUserInfoProps) {
  const width = variant === 'feed' ? 'max-w-[600px]' : 'max-w-[480px]'

  return (
    <div className={`flex items-center justify-center gap-6 w-full ${width}`}>
      <UserBlock user={sender} />
      <SentArrowIcon size={32} color="var(--color-kudos-text-secondary)" />
      <UserBlock user={receiver} />
    </div>
  )
}
