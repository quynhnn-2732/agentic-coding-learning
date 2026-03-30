import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardEntry } from '@/app/_components/awards-information/award-entry'
import type { AwardDetail } from '@/libs/types/homepage'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

const mockAward: AwardDetail = {
  id: '1',
  slug: 'top-talent',
  name: 'Top Talent',
  description: 'Vinh danh cá nhân xuất sắc.',
  imageUrl: '/images/homepage/award-top-talent.png',
  quantity: 10,
  unit: 'Đơn vị',
  prizeValue: '7.000.000 VNĐ',
}

describe('AwardEntry', () => {
  it('renders a section with id equal to award slug', () => {
    const { container } = render(
      <AwardEntry award={mockAward} imagePosition="left" />
    )
    const section = container.querySelector('section#top-talent')
    expect(section).toBeInTheDocument()
  })

  it('renders award image with correct alt text "{name} award"', () => {
    render(<AwardEntry award={mockAward} imagePosition="left" />)
    const img = screen.getByAltText('Top Talent award')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/images/homepage/award-top-talent.png')
  })

  it('places image before content when imagePosition="left"', () => {
    const { container } = render(
      <AwardEntry award={mockAward} imagePosition="left" />
    )
    const row = container.querySelector('section > div')!
    const children = Array.from(row.children)
    const imgIndex = children.findIndex((el) => el.tagName === 'IMG')
    const contentIndex = children.findIndex((el) => el.tagName !== 'IMG')
    expect(imgIndex).toBeLessThan(contentIndex)
  })

  it('places image after content when imagePosition="right"', () => {
    const { container } = render(
      <AwardEntry award={mockAward} imagePosition="right" />
    )
    const row = container.querySelector('section > div')!
    const children = Array.from(row.children)
    const imgIndex = children.findIndex((el) => el.tagName === 'IMG')
    const contentIndex = children.findIndex((el) => el.tagName !== 'IMG')
    expect(imgIndex).toBeGreaterThan(contentIndex)
  })

  it('renders the award name', () => {
    render(<AwardEntry award={mockAward} imagePosition="left" />)
    expect(screen.getByText('Top Talent')).toBeInTheDocument()
  })
})
