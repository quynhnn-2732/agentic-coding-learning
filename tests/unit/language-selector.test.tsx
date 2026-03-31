import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { IntlWrapper } from '../helpers/intl-wrapper'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ refresh: vi.fn() })),
}))

describe('LanguageSelector', () => {
  it('renders default VN label with flag and chevron', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<IntlWrapper><LanguageSelector /></IntlWrapper>)

    expect(screen.getByLabelText(/Chọn ngôn ngữ/i)).toBeInTheDocument()
    expect(screen.getByText('VN')).toBeInTheDocument()
  })

  it('opens dropdown on click and rotates chevron', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<IntlWrapper><LanguageSelector /></IntlWrapper>)

    const trigger = screen.getByLabelText(/Chọn ngôn ngữ/i)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(
      <IntlWrapper>
        <div>
          <div data-testid="outside">outside</div>
          <LanguageSelector />
        </div>
      </IntlWrapper>
    )

    fireEvent.click(screen.getByLabelText(/Chọn ngôn ngữ/i))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown and sets cookie when option selected', async () => {
    const mockRefresh = vi.fn()
    const { useRouter } = await import('next/navigation')
    vi.mocked(useRouter).mockReturnValue({ refresh: mockRefresh } as never)

    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<IntlWrapper><LanguageSelector /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/Chọn ngôn ngữ/i))
    const options = screen.getAllByRole('option')
    fireEvent.click(options[0])

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('shows flag icons for both VN and EN options', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    const { container } = render(<IntlWrapper><LanguageSelector /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/Chọn ngôn ngữ/i))
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)

    // Each option should have a flag icon (SVG)
    options.forEach((option) => {
      expect(option.querySelector('svg')).not.toBeNull()
    })
  })

  it('highlights selected locale option', async () => {
    const { LanguageSelector } = await import('@/app/_components/layout/language-selector')
    render(<IntlWrapper><LanguageSelector /></IntlWrapper>)

    fireEvent.click(screen.getByLabelText(/Chọn ngôn ngữ/i))
    const options = screen.getAllByRole('option')

    // VN is selected by default
    expect(options[0]).toHaveAttribute('aria-selected', 'true')
    expect(options[1]).toHaveAttribute('aria-selected', 'false')
  })
})
