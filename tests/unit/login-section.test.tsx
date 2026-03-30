import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'

// Mock child components to isolate LoginSection logic
vi.mock('@/app/_components/login/login-button', () => ({
  LoginButton: ({ onError }: { onError: (msg: string) => void }) => (
    <button onClick={() => onError('test_error')}>LOGIN With Google</button>
  ),
}))

vi.mock('@/app/_components/login/error-banner', () => ({
  ErrorBanner: ({ message, onDismiss }: { message: string; onDismiss: () => void }) => (
    <div role="alert">
      {message}
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  ),
}))

describe('LoginSection', () => {
  it('shows ErrorBanner when initialError is provided', async () => {
    const { LoginSection } = await import('@/app/_components/login/login-section')
    render(<LoginSection initialError="Đăng nhập thất bại" />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Đăng nhập thất bại')).toBeInTheDocument()
  })

  it('shows ErrorBanner when onError is triggered by LoginButton', async () => {
    const { LoginSection } = await import('@/app/_components/login/login-section')
    render(<LoginSection />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('LOGIN With Google'))

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('hides ErrorBanner when dismiss is clicked', async () => {
    const { LoginSection } = await import('@/app/_components/login/login-section')
    render(<LoginSection initialError="Lỗi" />)

    fireEvent.click(screen.getByText('Dismiss'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not show ErrorBanner when no error', async () => {
    const { LoginSection } = await import('@/app/_components/login/login-section')
    render(<LoginSection />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
