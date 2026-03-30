import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardCard } from '@/app/_components/homepage/award-card'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/image', () => ({
  default: ({ alt, src, loading }: { alt: string; src: string; loading?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} data-loading={loading} />
  ),
}))

const mockAward = {
  id: '1',
  slug: 'top-talent',
  name: 'Top Talent',
  description: 'Vinh danh cá nhân xuất sắc với năng lực vượt trội.',
  imageUrl: '/images/homepage/award-top-talent.png',
}

describe('AwardCard', () => {
  it('renders the award name', () => {
    render(<AwardCard award={mockAward} />)
    expect(screen.getByText('Top Talent')).toBeInTheDocument()
  })

  it('renders the award description', () => {
    render(<AwardCard award={mockAward} />)
    expect(screen.getByText(/vinh danh cá nhân/i)).toBeInTheDocument()
  })

  it('renders award image with lazy loading', () => {
    render(<AwardCard award={mockAward} />)
    const img = screen.getByAltText('Top Talent')
    expect(img).toHaveAttribute('src', '/images/homepage/award-top-talent.png')
    expect(img).toHaveAttribute('data-loading', 'lazy')
  })

  it('renders "Chi tiết" link text', () => {
    render(<AwardCard award={mockAward} />)
    expect(screen.getByText(/chi tiết/i)).toBeInTheDocument()
  })

  it('wraps entire card in a link to /awards-information#{slug}', () => {
    const { container } = render(<AwardCard award={mockAward} />)
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/awards-information#top-talent')
  })
})
