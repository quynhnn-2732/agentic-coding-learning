import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardTitleSection } from '@/app/_components/awards-information/award-title-section'

describe('AwardTitleSection', () => {
  it('renders an h1 heading', () => {
    render(<AwardTitleSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders the subtitle text "Sun* annual awards 2025" centered', () => {
    render(<AwardTitleSection />)
    const subtitle = screen.getByText('Sun* annual awards 2025')
    expect(subtitle).toBeInTheDocument()
    expect(subtitle.className).toContain('text-center')
  })

  it('renders the gold heading "Hệ thống giải thưởng SAA 2025"', () => {
    render(<AwardTitleSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Hệ thống giải thưởng SAA 2025')
  })
})
