import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock server action
vi.mock('@/libs/auth/actions', () => ({
  signInWithGoogle: vi.fn(),
}))

describe('LoginButton', () => {
  it('renders button text and Google icon', async () => {
    const { LoginButton } = await import('@/app/_components/login/login-button')
    render(<LoginButton onError={vi.fn()} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(/LOGIN With Google/i)).toBeInTheDocument()
  })

  it('shows loading state and disables button while in progress', async () => {
    const { signInWithGoogle } = await import('@/libs/auth/actions')
    // Never resolves during test to keep loading state
    vi.mocked(signInWithGoogle).mockImplementation(() => new Promise(() => {}))

    const { LoginButton } = await import('@/app/_components/login/login-button')
    render(<LoginButton onError={vi.fn()} />)

    const btn = screen.getByRole('button')
    fireEvent.click(btn)

    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('redirects via window.location.href when action returns { url }', async () => {
    const { signInWithGoogle } = await import('@/libs/auth/actions')
    vi.mocked(signInWithGoogle).mockResolvedValue({ url: 'https://accounts.google.com/oauth' })

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    })

    const { LoginButton } = await import('@/app/_components/login/login-button')
    render(<LoginButton onError={vi.fn()} />)

    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(window.location.href).toBe('https://accounts.google.com/oauth')
    })
  })

  it('calls onError when action returns { error }', async () => {
    const { signInWithGoogle } = await import('@/libs/auth/actions')
    vi.mocked(signInWithGoogle).mockResolvedValue({ error: 'auth_error' })

    const onError = vi.fn()
    const { LoginButton } = await import('@/app/_components/login/login-button')
    render(<LoginButton onError={onError} />)

    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalledWith('auth_error')
    })
  })
})
