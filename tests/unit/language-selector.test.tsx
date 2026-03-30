import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ refresh: vi.fn() })),
}))

describe('LanguageSelector', () => {
  it('renders default VN label with flag and chevron', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<LanguageSelector />)

    expect(screen.getByLabelText(/Select language/i)).toBeInTheDocument()
    expect(screen.getByText('VN')).toBeInTheDocument()
  })

  it('opens dropdown on click and rotates chevron', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<LanguageSelector />)

    const trigger = screen.getByLabelText(/Select language/i)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(
      <div>
        <div data-testid="outside">outside</div>
        <LanguageSelector />
      </div>
    )

    fireEvent.click(screen.getByLabelText(/Select language/i))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown and sets cookie when option selected', async () => {
    const mockRefresh = vi.fn()
    const { useRouter } = await import('next/navigation')
    vi.mocked(useRouter).mockReturnValue({ refresh: mockRefresh } as never)

    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<LanguageSelector />)

    fireEvent.click(screen.getByLabelText(/Select language/i))
    const options = screen.getAllByRole('option')
    fireEvent.click(options[0])

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(mockRefresh).toHaveBeenCalled()
  })
})
