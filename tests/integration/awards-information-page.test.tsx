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

// Mock async Server Components that use getTranslations
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
    </header>
  ),
}))

vi.mock('@/app/_components/homepage/footer', () => ({
  HomepageFooter: () => (
    <footer>
      <p>Bản quyền thuộc về Sun* © 2025</p>
    </footer>
  ),
}))

// Mock async server components that can't be rendered in jsdom
vi.mock('@/app/_components/awards-information/keyvisual-banner', () => ({
  KeyvisualBanner: () => (
    <div data-testid="keyvisual-banner">
      <h1>Hệ thống giải thưởng SAA 2025</h1>
    </div>
  ),
}))

vi.mock('@/app/_components/homepage/sunkudos-section', () => ({
  SunkudosSection: () => (
    <section data-testid="sunkudos-section">
      <h2>Phong trào ghi nhận</h2>
    </section>
  ),
}))

vi.mock('@/app/_components/awards-information/award-metadata-box', () => ({
  AwardMetadataBox: (props: Record<string, unknown>) => {
    if (props.type === 'quantity') {
      return (
        <div className="flex flex-row items-center gap-[16px]">
          <span>Số lượng giải thưởng:</span>
          <span>{String(props.quantity)}</span>
          <span>{props.unit as string}</span>
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-[16px]">
        <span>Giá trị giải thưởng:</span>
        <span>{props.prizeValue as string}</span>
        <span>{props.subtitle as string}</span>
      </div>
    )
  },
}))

// AwardSidebar (client component) uses IntersectionObserver — mock for jsdom
class MockIntersectionObserver {
  constructor() {}
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

vi.mock('@/libs/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            user_metadata: {
              avatar_url: 'https://example.com/avatar.jpg',
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

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/awards-information',
}))

async function renderAwardsPage() {
  const { default: AwardsInformationPage } = await import(
    '@/app/awards-information/page'
  )
  const jsx = await AwardsInformationPage()
  render(jsx as React.ReactElement)
}

describe('AwardsInformationPage integration', () => {
  it('renders the page title heading', async () => {
    await renderAwardsPage()
    expect(
      screen.getByRole('heading', { level: 1, name: /hệ thống giải thưởng saa 2025/i })
    ).toBeInTheDocument()
  })

  it('renders 6 award sections with correct section ids', async () => {
    const { container } = render(<div />)
    const { default: AwardsInformationPage } = await import(
      '@/app/awards-information/page'
    )
    const jsx = await AwardsInformationPage()
    const { container: pageContainer } = render(jsx as React.ReactElement)

    const slugs = [
      'top-talent',
      'top-project',
      'top-project-leader',
      'best-manager',
      'signature-2025-creator',
      'mvp',
    ]
    for (const slug of slugs) {
      expect(pageContainer.querySelector(`section#${slug}`)).toBeInTheDocument()
    }
  })

  it('renders all 6 award names (sidebar + heading)', async () => {
    await renderAwardsPage()
    // Each name appears at least once (sidebar button + h2 heading)
    expect(screen.getAllByText('Top Talent').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Top Project').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Top Project Leader').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Best Manager').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Signature 2025 - Creator').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('MVP').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the Signature award with dual prize values and "Hoặc" divider', async () => {
    await renderAwardsPage()
    expect(screen.getByText('5.000.000 VNĐ')).toBeInTheDocument()
    expect(screen.getByText('Hoặc')).toBeInTheDocument()
    expect(screen.getByText('8.000.000 VNĐ')).toBeInTheDocument()
  })

  it('renders the Sun* Kudos section', async () => {
    await renderAwardsPage()
    expect(screen.getByText('Phong trào ghi nhận')).toBeInTheDocument()
  })
})
