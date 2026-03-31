import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroBadge } from '@/app/_components/sun-kudos/hero-badge'

describe('HeroBadge', () => {
  it('renders "New Hero" for tier="new"', () => {
    render(<HeroBadge tier="new" />)
    expect(screen.getByText('New Hero')).toBeInTheDocument()
  })

  it('renders "Rising Hero" for tier="rising"', () => {
    render(<HeroBadge tier="rising" />)
    expect(screen.getByText('Rising Hero')).toBeInTheDocument()
  })

  it('renders "Super Hero" for tier="super"', () => {
    render(<HeroBadge tier="super" />)
    expect(screen.getByText('Super Hero')).toBeInTheDocument()
  })

  it('renders "Legend Hero" for tier="legend"', () => {
    render(<HeroBadge tier="legend" />)
    expect(screen.getByText('Legend Hero')).toBeInTheDocument()
  })

  it('has border and pill shape styling', () => {
    const { container } = render(<HeroBadge tier="new" />)
    const badge = container.firstElementChild as HTMLElement
    expect(badge).toBeInTheDocument()
    expect(badge.className).toMatch(/border/)
    expect(badge.className).toMatch(/rounded/)
  })

  it('renders background image for the tier', () => {
    const { container } = render(<HeroBadge tier="new" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img?.getAttribute('src') || img?.getAttribute('data-src') || '').toContain('badge-new-hero')
  })
})
