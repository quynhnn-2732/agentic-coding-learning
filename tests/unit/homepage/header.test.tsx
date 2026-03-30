import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomepageHeader } from '@/app/_components/homepage/header'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn() }),
  usePathname: () => '/',
}))

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

describe('HomepageHeader', () => {
  it('renders the SAA logo', () => {
    render(<HomepageHeader />)
    expect(screen.getByAltText('Sun Annual Awards 2025')).toBeInTheDocument()
  })

  it('renders "About SAA 2025" nav link as selected', () => {
    render(<HomepageHeader />)
    expect(screen.getByText('About SAA 2025')).toBeInTheDocument()
  })

  it('renders "Awards Information" with correct href', () => {
    render(<HomepageHeader />)
    const link = screen.getByRole('link', { name: /awards information/i })
    expect(link).toHaveAttribute('href', '/awards-information')
  })

  it('renders "Sun* Kudos" with correct href', () => {
    render(<HomepageHeader />)
    const link = screen.getByRole('link', { name: /sun\* kudos/i })
    expect(link).toHaveAttribute('href', '/sun-kudos')
  })

  it('renders notification bell with aria-label', () => {
    render(<HomepageHeader />)
    expect(screen.getByLabelText('Thông báo')).toBeInTheDocument()
  })

  it('renders avatar placeholder when no avatarUrl provided', () => {
    render(<HomepageHeader />)
    expect(screen.getByLabelText('Tài khoản')).toBeInTheDocument()
  })

  it('renders user avatar image when avatarUrl is provided', () => {
    render(<HomepageHeader avatarUrl="https://lh3.googleusercontent.com/test.jpg" />)
    const avatar = screen.getByAltText('User avatar')
    expect(avatar).toHaveAttribute('src', 'https://lh3.googleusercontent.com/test.jpg')
  })
})
