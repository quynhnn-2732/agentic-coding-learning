'use client'

import type { KudoUser } from "@/libs/types/kudos";
import { useTranslations } from 'next-intl'

interface TopSunnerLeaderboardProps {
  users: KudoUser[];
}

export function TopSunnerLeaderboard({ users }: TopSunnerLeaderboardProps) {
  const t = useTranslations('Leaderboard')
  return (
    <div
      className="flex flex-col gap-4 rounded-[17px] p-6"
      style={{
        backgroundColor: "#00070C",
        border: "1px solid #998C5F",
      }}
    >
      <h3
        className="font-montserrat font-bold text-base leading-6 tracking-[0.5px]"
        style={{ color: "#FFEA9E" }}
      >
        {t('title')}
      </h3>

      <div className="flex flex-col gap-3">
        {users.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3">
            {/* Red dot indicator */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#FF0000" }}
            />

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-montserrat font-bold text-xs text-white"
              style={{ backgroundColor: "#2D5A7B" }}
            >
              {user.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex flex-col min-w-0">
              <span className="font-montserrat font-bold text-sm leading-5 text-white truncate">
                {user.name}
              </span>
              <span className="font-montserrat text-xs leading-4 text-white/50">
                {t('receivedFrom', { count: user.department, department: user.department })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
