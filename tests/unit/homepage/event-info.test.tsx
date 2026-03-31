import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventInfo } from '@/app/_components/homepage/event-info'
import { IntlWrapper } from '../../helpers/intl-wrapper'
import messages from '../../../messages/vi.json'

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    const ns = messages[namespace as keyof typeof messages] as Record<string, string>
    return (key: string) => ns?.[key] ?? key
  }),
}))

async function renderEventInfo(props: { datetimeIso: string; location: string }) {
  const jsx = await EventInfo(props)
  return render(<IntlWrapper>{jsx}</IntlWrapper>)
}

describe('EventInfo', () => {
  it('formats date as dd/mm/yyyy (Vietnamese format)', async () => {
    await renderEventInfo({
      datetimeIso: '2025-12-26T18:30:00+07:00',
      location: 'Âu Cơ Art Center',
    })
    expect(screen.getByText('26/12/2025')).toBeInTheDocument()
  })

  it('formats time as HhMM (e.g. 18h30, NOT 18:30:00)', async () => {
    await renderEventInfo({
      datetimeIso: '2025-12-26T18:30:00+07:00',
      location: 'Âu Cơ Art Center',
    })
    expect(screen.getByText('18h30')).toBeInTheDocument()
  })

  it('renders the venue/location', async () => {
    await renderEventInfo({
      datetimeIso: '2025-12-26T18:30:00+07:00',
      location: 'Âu Cơ Art Center',
    })
    expect(screen.getByText('Âu Cơ Art Center')).toBeInTheDocument()
  })

  it('renders the livestream note', async () => {
    await renderEventInfo({
      datetimeIso: '2025-12-26T18:30:00+07:00',
      location: 'Âu Cơ Art Center',
    })
    expect(screen.getByText(/tường thuật trực tiếp/i)).toBeInTheDocument()
  })

  it('renders "Thời gian:" and "Địa điểm:" labels', async () => {
    await renderEventInfo({
      datetimeIso: '2025-12-26T18:30:00+07:00',
      location: 'Âu Cơ Art Center',
    })
    expect(screen.getByText(/thời gian/i)).toBeInTheDocument()
    expect(screen.getByText(/địa điểm/i)).toBeInTheDocument()
  })

  it('renders empty gracefully when datetimeIso is invalid', async () => {
    const { container } = await renderEventInfo({
      datetimeIso: 'not-a-date',
      location: 'Test Venue',
    })
    // Should not crash; container should still exist
    expect(container).toBeTruthy()
  })
})
