import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { KudosBanner } from '@/app/_components/sun-kudos/kudos-banner'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

describe('KudosBanner', () => {
  it('renders the hero title', () => {
    render(<KudosBanner />)
    expect(screen.getByText('Hệ thống ghi nhận và cảm ơn')).toBeDefined()
  })

  it('renders the KUDOS logo image', () => {
    render(<KudosBanner />)
    const logo = screen.getByAltText('Sun* Kudos')
    expect(logo).toBeDefined()
    expect(logo.getAttribute('src')).toBe('/images/sun-kudos/kudos-logo.svg')
  })
})
