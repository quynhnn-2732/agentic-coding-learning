import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IntlWrapper } from '../helpers/intl-wrapper'

// Mock next/navigation
const mockPush = vi.fn()
const mockRefresh = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: mockPush, refresh: mockRefresh })),
  usePathname: vi.fn(() => '/'),
}))

// Mock Supabase browser client
const mockSignOut = vi.fn()
vi.mock('@/libs/supabase/client', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signOut: mockSignOut,
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  })),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

// ============================================================
// Phase 2: US3 — Open and Close Dropdown
// ============================================================
describe('ProfileDropdown — US3: Open/Close', () => {
  it('renders closed by default (no menu visible)', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    const trigger = screen.getByLabelText(/tài khoản/i)
    fireEvent.click(trigger)

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes dropdown when clicking outside', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(
      <IntlWrapper>
        <div>
          <div data-testid="outside">outside</div>
          <ProfileDropdown />
        </div>
      </IntlWrapper>
    )

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes dropdown on Escape and returns focus to trigger', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    const trigger = screen.getByLabelText(/tài khoản/i)
    fireEvent.click(trigger)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(document.activeElement).toBe(trigger)
  })

  it('has correct ARIA attributes on trigger', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    const trigger = screen.getByLabelText(/tài khoản/i)
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})

// ============================================================
// Phase 3: US1 — Profile Navigation
// ============================================================
describe('ProfileDropdown — US1: Profile Navigation', () => {
  it('navigates to /profile when Profile item is clicked', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))

    const profileItem = screen.getByRole('menuitem', { name: /profile/i })
    expect(profileItem.closest('a')).toHaveAttribute('href', '/profile')
  })

  it('closes dropdown after clicking Profile', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /profile/i }))

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('shows active glow state when pathname is /profile', async () => {
    const { usePathname } = await import('next/navigation')
    vi.mocked(usePathname).mockReturnValue('/profile')

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))

    const profileItem = screen.getByRole('menuitem', { name: /profile/i })
    expect(profileItem.className).toMatch(/bg-\[rgba\(255,234,158,0\.1\)\]/)
  })

  it('shows inactive state when pathname is not /profile', async () => {
    const { usePathname } = await import('next/navigation')
    vi.mocked(usePathname).mockReturnValue('/')

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))

    const profileItem = screen.getByRole('menuitem', { name: /profile/i })
    // Inactive state: no direct bg (only hover:bg), no text-shadow
    expect(profileItem.className).not.toMatch(/\[text-shadow:/)
    expect(profileItem.className).toMatch(/hover:bg-/)
  })

  it('activates Profile item on Enter keypress', async () => {
    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))

    const profileItem = screen.getByRole('menuitem', { name: /profile/i })
    fireEvent.keyDown(profileItem, { key: 'Enter' })

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

// ============================================================
// Phase 4: US2 — Logout
// ============================================================
describe('ProfileDropdown — US2: Logout', () => {
  it('calls supabase.auth.signOut when Logout item is clicked', async () => {
    mockSignOut.mockResolvedValue({ error: null })

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('redirects to /login on successful signOut', async () => {
    mockSignOut.mockResolvedValue({ error: null })

    // Mock window.location for hard redirect
    const locationAssignSpy = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { href: '/', set href(v: string) { locationAssignSpy(v) } },
      writable: true,
    })

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

    await vi.waitFor(() => {
      expect(locationAssignSpy).toHaveBeenCalledWith('/login')
    })
  })

  it('shows loading state during signOut', async () => {
    let resolveSignOut: (v: { error: null }) => void
    mockSignOut.mockReturnValue(
      new Promise((r) => {
        resolveSignOut = r
      })
    )

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

    const logoutItem = screen.getByRole('menuitem', { name: /logout/i })
    expect(logoutItem.className).toMatch(/opacity-60/)

    resolveSignOut!({ error: null })
  })

  it('shows error toast on signOut failure', async () => {
    mockSignOut.mockResolvedValue({
      error: { message: 'Network error' },
    })

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

    await vi.waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Network error')
    })

    // Dropdown stays open
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('prevents duplicate clicks during loading', async () => {
    mockSignOut.mockReturnValue(new Promise(() => {})) // never resolves

    const { ProfileDropdown } = await import(
      '@/app/_components/layout/profile-dropdown'
    )
    render(<IntlWrapper><ProfileDropdown /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/tài khoản/i))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))
    fireEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })
})
