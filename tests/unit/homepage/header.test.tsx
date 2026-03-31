import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomepageHeader } from '@/app/_components/homepage/header'
import { IntlWrapper } from '../../helpers/intl-wrapper'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
  usePathname: () => '/',
}))

// Mock next-intl/server for Server Component
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => {
    const messages: Record<string, Record<string, string>> = {
      Header: {
        goToHomepage: 'Về trang chủ',
        aboutSaa: 'About SAA 2025',
        awardsInfo: 'Awards Information',
        sunKudos: 'Sun* Kudos',
        notification: 'Thông báo',
      },
    }
    return (key: string) => messages['Header'][key] ?? key
  }),
}))

// Mock Supabase browser client (used by ProfileDropdown)
vi.mock('@/libs/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  })),
}))

// Mock signOut server action (used by ProfileDropdown)
vi.mock('@/libs/auth/actions', () => ({
  signOut: vi.fn(),
}))

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

describe('HomepageHeader', () => {
  it('renders the SAA logo', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    expect(screen.getByAltText('Sun Annual Awards 2025')).toBeInTheDocument()
  })

  it('renders "About SAA 2025" nav link', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    expect(screen.getByText('About SAA 2025')).toBeInTheDocument()
  })

  it('renders "Awards Information" with correct href', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    const link = screen.getByRole('link', { name: /awards information/i })
    expect(link).toHaveAttribute('href', '/awards-information')
  })

  it('renders "Sun* Kudos" with correct href', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    const link = screen.getByRole('link', { name: /sun\* kudos/i })
    expect(link).toHaveAttribute('href', '/sun-kudos')
  })

  it('renders notification bell with aria-label', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    expect(screen.getByLabelText('Thông báo')).toBeInTheDocument()
  })

  it('renders avatar placeholder when no avatarUrl provided', async () => {
    const header = await HomepageHeader({})
    render(<IntlWrapper>{header}</IntlWrapper>)
    expect(screen.getByLabelText('Tài khoản')).toBeInTheDocument()
  })

  it('renders user avatar image when avatarUrl is provided', async () => {
    const header = await HomepageHeader({ avatarUrl: 'https://lh3.googleusercontent.com/test.jpg' })
    render(<IntlWrapper>{header}</IntlWrapper>)
    const avatar = screen.getByAltText('User avatar')
    expect(avatar).toHaveAttribute('src', 'https://lh3.googleusercontent.com/test.jpg')
  })
})
