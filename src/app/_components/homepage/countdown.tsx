'use client'

import { useState, useEffect } from 'react'
import type { CountdownState } from '@/libs/types/homepage'

interface CountdownProps {
  targetDateIso: string
}

function computeTimeLeft(targetMs: number): CountdownState {
  const diff = targetMs - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isEventPast: true }
  }
  const totalMinutes = Math.floor(diff / 60_000)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)
  return { days, hours, minutes, isEventPast: false }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function SingleDigitTile({ char }: { char: string }) {
  return (
    <div
      data-testid="digit-tile"
      className="flex items-center justify-center w-[51px] h-[82px] rounded-md backdrop-blur-[17px]"
      style={{ border: '0.5px solid #FFEA9E' }}
    >
      <span
        className="text-white text-[49px] leading-none font-normal"
        style={{ fontFamily: 'var(--font-digital, monospace)' }}
      >
        {char}
      </span>
    </div>
  )
}

interface DigitGroupProps {
  value: string
  label: string
}

function DigitGroup({ value, label }: DigitGroupProps) {
  const [d1, d2] = value.split('')
  return (
    <div className="flex flex-col items-center gap-[4px]">
      <div className="flex flex-row gap-[4px]">
        <SingleDigitTile key={`${label}-d1-${d1}`} char={d1} />
        <SingleDigitTile key={`${label}-d2-${d2}`} char={d2} />
      </div>
      <span className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
        {label}
      </span>
    </div>
  )
}

export function Countdown({ targetDateIso }: CountdownProps) {
  const targetMs = (() => {
    try {
      const ms = new Date(targetDateIso).getTime()
      return isNaN(ms) ? 0 : ms
    } catch {
      return 0
    }
  })()

  const [state, setState] = useState<CountdownState>(() => computeTimeLeft(targetMs))

  useEffect(() => {
    if (targetMs === 0) return
    const id = setInterval(() => {
      setState(computeTimeLeft(targetMs))
    }, 60_000)
    return () => clearInterval(id)
  }, [targetMs])

  const { days, hours, minutes, isEventPast } = state

  return (
    <div className="flex flex-col gap-[16px]">
      {!isEventPast && (
        <span className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
          Coming soon
        </span>
      )}
      <div className="flex flex-row gap-[40px]">
        <DigitGroup value={pad(days)} label="DAYS" />
        <DigitGroup value={pad(hours)} label="HOURS" />
        <DigitGroup value={pad(minutes)} label="MINUTES" />
      </div>
    </div>
  )
}
