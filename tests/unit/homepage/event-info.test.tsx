import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventInfo } from '@/app/_components/homepage/event-info'

describe('EventInfo', () => {
  it('formats date as dd/mm/yyyy (Vietnamese format)', () => {
    render(
      <EventInfo
        datetimeIso="2025-12-26T18:30:00+07:00"
        location="Âu Cơ Art Center"
      />
    )
    expect(screen.getByText('26/12/2025')).toBeInTheDocument()
  })

  it('formats time as HhMM (e.g. 18h30, NOT 18:30:00)', () => {
    render(
      <EventInfo
        datetimeIso="2025-12-26T18:30:00+07:00"
        location="Âu Cơ Art Center"
      />
    )
    expect(screen.getByText('18h30')).toBeInTheDocument()
  })

  it('renders the venue/location', () => {
    render(
      <EventInfo
        datetimeIso="2025-12-26T18:30:00+07:00"
        location="Âu Cơ Art Center"
      />
    )
    expect(screen.getByText('Âu Cơ Art Center')).toBeInTheDocument()
  })

  it('renders the livestream note', () => {
    render(
      <EventInfo
        datetimeIso="2025-12-26T18:30:00+07:00"
        location="Âu Cơ Art Center"
      />
    )
    expect(screen.getByText(/tường thuật trực tiếp/i)).toBeInTheDocument()
  })

  it('renders "Thời gian:" and "Địa điểm:" labels', () => {
    render(
      <EventInfo
        datetimeIso="2025-12-26T18:30:00+07:00"
        location="Âu Cơ Art Center"
      />
    )
    expect(screen.getByText(/thời gian/i)).toBeInTheDocument()
    expect(screen.getByText(/địa điểm/i)).toBeInTheDocument()
  })

  it('renders empty gracefully when datetimeIso is invalid', () => {
    const { container } = render(
      <EventInfo datetimeIso="not-a-date" location="Test Venue" />
    )
    // Should not crash; container should still exist
    expect(container).toBeTruthy()
  })
})
