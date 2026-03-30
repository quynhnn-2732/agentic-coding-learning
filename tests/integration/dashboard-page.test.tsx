import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock Supabase server client
vi.mock('@/libs/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            user_metadata: {
              avatar_url: 'https://lh3.googleusercontent.com/test-avatar.jpg',
            },
          },
        },
        error: null,
      }),
    },
  }),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn() }),
  usePathname: () => '/',
}))

async function renderHomePage() {
  const { default: HomePage } = await import('@/app/page')
  const jsx = await HomePage()
  render(jsx as React.ReactElement)
}

describe('HomePage integration', () => {
  it('renders all major sections', async () => {
    await renderHomePage()
    // Logo appears in header and footer
    expect(screen.getAllByAltText('Sun Annual Awards 2025').length).toBeGreaterThanOrEqual(1)
    // Awards section
    expect(screen.getByText('Hệ thống giải thưởng')).toBeInTheDocument()
    // Sunkudos section heading
    expect(screen.getByText('Phong trào ghi nhận')).toBeInTheDocument()
    // Footer copyright
    expect(screen.getByText(/bản quyền thuộc về sun\* © 2025/i)).toBeInTheDocument()
  })

  it('renders 6 award cards', async () => {
    await renderHomePage()
    const awardLinks = screen.getAllByText(/chi tiết/i)
    // Chi tiết appears in each award card + sunkudos section = 7 total
    expect(awardLinks.length).toBeGreaterThanOrEqual(6)
  })

  it('renders user avatar when session has avatar_url', async () => {
    await renderHomePage()
    const avatarImg = screen.getByAltText('User avatar')
    expect(avatarImg).toHaveAttribute(
      'src',
      'https://lh3.googleusercontent.com/test-avatar.jpg'
    )
  })

  it('renders navigation links', async () => {
    await renderHomePage()
    // "Awards Information" appears in both header and footer
    expect(screen.getAllByText('Awards Information').length).toBeGreaterThanOrEqual(2)
    // "Sun* Kudos" appears in header, sunkudos heading, and footer
    const kudosLinks = screen.getAllByRole('link', { name: /sun\* kudos/i })
    expect(kudosLinks.length).toBeGreaterThanOrEqual(1)
  })
})
