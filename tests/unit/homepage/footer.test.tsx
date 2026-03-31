import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomepageFooter } from '@/app/_components/homepage/footer'
import messages from '../../../messages/vi.json'

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    const ns = messages[namespace as keyof typeof messages] as Record<string, string>
    return (key: string) => ns?.[key] ?? key
  }),
}))

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

describe('HomepageFooter', () => {
  it('renders the SAA logo', async () => {
    const footer = await HomepageFooter()
    render(footer)
    expect(screen.getByAltText('Sun Annual Awards 2025')).toBeInTheDocument()
  })

  it('renders "About SAA 2025" link pointing to /', async () => {
    const footer = await HomepageFooter()
    render(footer)
    const link = screen.getByRole('link', { name: /about saa 2025/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders "Awards Information" link pointing to /awards-information', async () => {
    const footer = await HomepageFooter()
    render(footer)
    const link = screen.getByRole('link', { name: /awards information/i })
    expect(link).toHaveAttribute('href', '/awards-information')
  })

  it('renders "Sun* Kudos" link pointing to /sun-kudos', async () => {
    const footer = await HomepageFooter()
    render(footer)
    const link = screen.getByRole('link', { name: /sun\* kudos/i })
    expect(link).toHaveAttribute('href', '/sun-kudos')
  })

  it('renders copyright text', async () => {
    const footer = await HomepageFooter()
    render(footer)
    expect(screen.getByText(/bản quyền thuộc về sun\* © 2025/i)).toBeInTheDocument()
  })
})
