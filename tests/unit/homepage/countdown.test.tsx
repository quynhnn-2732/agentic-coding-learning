import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Countdown } from '@/app/_components/homepage/countdown'

const EVENT_DATE = '2025-12-26T18:30:00+07:00'
const EVENT_MS = new Date(EVENT_DATE).getTime()

describe('Countdown', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows "Coming soon" label before event date', () => {
    // 30 days before event
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_MS - 30 * 24 * 60 * 60 * 1000)
    render(<Countdown targetDateIso={EVENT_DATE} />)
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it('renders each digit character in its own tile (2 tiles per unit)', () => {
    vi.useFakeTimers()
    // Exactly 3 days, 5 hours, 7 minutes before event → days="03", hours="05", minutes="07"
    const offset = (3 * 24 * 60 + 5 * 60 + 7) * 60 * 1000
    vi.setSystemTime(EVENT_MS - offset)
    render(<Countdown targetDateIso={EVENT_DATE} />)

    // Each unit has 2 individual single-char tiles → 3 units × 2 tiles = 6 total
    const tiles = screen.getAllByTestId('digit-tile')
    expect(tiles.length).toBe(6)

    // Each tile must contain exactly ONE character (not combined "03", "05", "07")
    expect(tiles.every((t) => t.textContent!.length === 1)).toBe(true)
    // days=03 → tiles "0" and "3"
    expect(tiles.some((t) => t.textContent === '0')).toBe(true)
    expect(tiles.some((t) => t.textContent === '3')).toBe(true)
    // hours=05 → tile "5"
    expect(tiles.some((t) => t.textContent === '5')).toBe(true)
    // minutes=07 → tile "7"
    expect(tiles.some((t) => t.textContent === '7')).toBe(true)
  })

  it('shows zero-padded digits for days/hours/minutes as individual chars', () => {
    vi.useFakeTimers()
    // Exactly 3 days, 5 hours, 7 minutes before event
    const offset = (3 * 24 * 60 + 5 * 60 + 7) * 60 * 1000
    vi.setSystemTime(EVENT_MS - offset)
    render(<Countdown targetDateIso={EVENT_DATE} />)
    const tiles = screen.getAllByTestId('digit-tile')
    // days=03 → "0","3"; hours=05 → "0","5"; minutes=07 → "0","7"
    const chars = tiles.map((t) => t.textContent)
    expect(chars).toContain('0')
    expect(chars).toContain('3')
    expect(chars).toContain('5')
    expect(chars).toContain('7')
  })

  it('hides "Coming soon" and shows all-zero tiles after event date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_MS + 1000)
    render(<Countdown targetDateIso={EVENT_DATE} />)
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument()
    // All 6 tiles should show "0"
    const tiles = screen.getAllByTestId('digit-tile')
    expect(tiles.length).toBe(6)
    expect(tiles.every((t) => t.textContent === '0')).toBe(true)
  })

  it('updates digit tiles after 1 minute tick', () => {
    vi.useFakeTimers()
    // Start at exactly 2 minutes before event: hours=00, minutes=02
    vi.setSystemTime(EVENT_MS - 2 * 60 * 1000)
    render(<Countdown targetDateIso={EVENT_DATE} />)
    let tiles = screen.getAllByTestId('digit-tile')
    // minutes=02 → tiles "0","2"
    expect(tiles.some((t) => t.textContent === '2')).toBe(true)

    act(() => { vi.advanceTimersByTime(60_000) })
    tiles = screen.getAllByTestId('digit-tile')
    // minutes=01 → tiles "0","1" — "2" is gone, "1" appears
    expect(tiles.some((t) => t.textContent === '1')).toBe(true)
    expect(tiles.some((t) => t.textContent === '2')).toBe(false)
  })

  it('shows DAYS, HOURS, MINUTES unit labels', () => {
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_MS - 30 * 24 * 60 * 60 * 1000)
    render(<Countdown targetDateIso={EVENT_DATE} />)
    expect(screen.getByText('DAYS')).toBeInTheDocument()
    expect(screen.getByText('HOURS')).toBeInTheDocument()
    expect(screen.getByText('MINUTES')).toBeInTheDocument()
  })

  it('shows "0" in days tile when less than 24h remaining', () => {
    vi.useFakeTimers()
    vi.setSystemTime(EVENT_MS - 2 * 60 * 60 * 1000) // 2 hours before, days=0
    render(<Countdown targetDateIso={EVENT_DATE} />)
    const tiles = screen.getAllByTestId('digit-tile')
    // days=00 → both tiles "0"; hours=02 → tiles "0","2"
    expect(tiles.some((t) => t.textContent === '2')).toBe(true) // hours units digit
    // all days tiles should be "0"
    expect(tiles.filter((t) => t.textContent === '0').length).toBeGreaterThanOrEqual(2)
  })
})
