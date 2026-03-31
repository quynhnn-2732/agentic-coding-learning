import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HeartButton } from '@/app/_components/sun-kudos/heart-button'
import { IntlWrapper } from '../../helpers/intl-wrapper'

vi.mock('@/libs/data/kudos-queries', () => ({
  toggleHeart: vi.fn(),
}))

import { toggleHeart } from '@/libs/data/kudos-queries'
const mockToggleHeart = vi.mocked(toggleHeart)

describe('HeartButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with initial count and un-hearted state', () => {
    render(<IntlWrapper><HeartButton kudoId="1" initialCount={1000} initialIsHearted={false} /></IntlWrapper>)
    expect(screen.getByText('1,000')).toBeDefined()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders with hearted state', () => {
    render(<IntlWrapper><HeartButton kudoId="1" initialCount={500} initialIsHearted={true} /></IntlWrapper>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('optimistically updates on click then syncs with server', async () => {
    mockToggleHeart.mockResolvedValueOnce({ hearted: true, heart_count: 1001 })

    render(<IntlWrapper><HeartButton kudoId="1" initialCount={1000} initialIsHearted={false} /></IntlWrapper>)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    // Optimistic: immediately shows 1,001
    expect(screen.getByText('1,001')).toBeDefined()

    await waitFor(() => {
      expect(mockToggleHeart).toHaveBeenCalledWith('1')
    })
  })

  it('rolls back on server error', async () => {
    mockToggleHeart.mockRejectedValueOnce(new Error('Network error'))

    render(<IntlWrapper><HeartButton kudoId="1" initialCount={1000} initialIsHearted={false} /></IntlWrapper>)
    fireEvent.click(screen.getByRole('button'))

    // Optimistic: 1,001
    expect(screen.getByText('1,001')).toBeDefined()

    // After error: rolls back to 1,000
    await waitFor(() => {
      expect(screen.getByText('1,000')).toBeDefined()
    })
  })
})
