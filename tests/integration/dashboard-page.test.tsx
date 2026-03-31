import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import messages from '../../messages/vi.json'

// Mock next-intl/server for async Server Components
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    const ns = messages[namespace as keyof typeof messages] as Record<string, string>
    return (key: string) => ns?.[key] ?? key
  }),
  getLocale: vi.fn(async () => 'vi'),
  getMessages: vi.fn(async () => messages),
}))

// Mock next-intl for Client Components
vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace: string) => {
    const ns = messages[namespace as keyof typeof messages] as Record<string, string>
    return (key: string) => ns?.[key] ?? key
  }),
  useLocale: vi.fn(() => 'vi'),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock async Server Components that use getTranslations (React test renderer doesn't support async components)
vi.mock('@/app/_components/homepage/header', () => ({
  HomepageHeader: ({ avatarUrl, activePath }: { avatarUrl?: string; activePath?: string }) => (
    <header>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Sun Annual Awards 2025" src="/images/saa-logo.png" />
      <nav>
        <a href="/">About SAA 2025</a>
        <a href="/awards-information">Awards Information</a>
        <a href="/sun-kudos">Sun* Kudos</a>
      </nav>
      <button aria-label="Thông báo">bell</button>
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="User avatar" src={avatarUrl} />
      ) : (
        <button aria-label="Tài khoản">account</button>
      )}
    </header>
  ),
}))

vi.mock('@/app/_components/homepage/footer', () => ({
  HomepageFooter: () => (
    <footer>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="Sun Annual Awards 2025" src="/images/saa-logo.png" />
      <nav>
        <a href="/">About SAA 2025</a>
        <a href="/awards-information">Awards Information</a>
        <a href="/sun-kudos">Sun* Kudos</a>
      </nav>
      <p>Bản quyền thuộc về Sun* © 2025</p>
    </footer>
  ),
}))

vi.mock('@/app/_components/homepage/hero-section', () => ({
  HeroSection: () => <section data-testid="hero-section">Hero Section</section>,
}))

vi.mock('@/app/_components/homepage/b4-content', () => ({
  B4Content: () => <section data-testid="b4-content">B4 Content</section>,
}))

vi.mock('@/app/_components/homepage/awards-section', () => ({
  AwardsSection: () => (
    <section data-testid="awards-section">
      <h2>Hệ thống giải thưởng</h2>
      <a href="/awards-information/top-talent">Chi tiết</a>
      <a href="/awards-information/top-project">Chi tiết</a>
      <a href="/awards-information/top-project-leader">Chi tiết</a>
      <a href="/awards-information/best-manager">Chi tiết</a>
      <a href="/awards-information/signature-2025-creator">Chi tiết</a>
      <a href="/awards-information/mvp">Chi tiết</a>
    </section>
  ),
}))

vi.mock('@/app/_components/homepage/sunkudos-section', () => ({
  SunkudosSection: () => (
    <section data-testid="sunkudos-section">
      <h2>Phong trào ghi nhận</h2>
      <a href="/sun-kudos">Sun* Kudos</a>
      <a href="/sun-kudos">Chi tiết</a>
    </section>
  ),
}))

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
  signInWithGoogle: vi.fn(),
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
