import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomepageFooter } from '@/app/_components/homepage/footer'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

describe('HomepageFooter', () => {
  it('renders the SAA logo', () => {
    render(<HomepageFooter />)
    expect(screen.getByAltText('Sun Annual Awards 2025')).toBeInTheDocument()
  })

  it('renders "About SAA 2025" link pointing to /', () => {
    render(<HomepageFooter />)
    const link = screen.getByRole('link', { name: /about saa 2025/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders "Awards Information" link pointing to /awards-information', () => {
    render(<HomepageFooter />)
    const link = screen.getByRole('link', { name: /awards information/i })
    expect(link).toHaveAttribute('href', '/awards-information')
  })

  it('renders "Sun* Kudos" link pointing to /sun-kudos', () => {
    render(<HomepageFooter />)
    const link = screen.getByRole('link', { name: /sun\* kudos/i })
    expect(link).toHaveAttribute('href', '/sun-kudos')
  })

  it('renders copyright text', () => {
    render(<HomepageFooter />)
    expect(screen.getByText(/bản quyền thuộc về sun\* © 2025/i)).toBeInTheDocument()
  })
})
