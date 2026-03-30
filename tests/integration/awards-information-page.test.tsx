import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

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
