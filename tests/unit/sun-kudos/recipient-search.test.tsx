import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RecipientSearch } from '@/app/_components/sun-kudos/write-kudo/recipient-search'
import { IntlWrapper } from '../../helpers/intl-wrapper'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('RecipientSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const defaultProps = {
    value: null as { id: string; name: string; avatar_url: string | null } | null,
    onChange: vi.fn(),
    error: undefined as string | undefined,
  }

  it('renders label "Người nhận" with required asterisk', () => {
    render(<IntlWrapper><RecipientSearch {...defaultProps} /></IntlWrapper>)
    expect(screen.getByText('Người nhận')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders input with placeholder "Tìm kiếm"', () => {
    render(<IntlWrapper><RecipientSearch {...defaultProps} /></IntlWrapper>)
    expect(screen.getByPlaceholderText('Tìm kiếm')).toBeInTheDocument()
  })

  it('shows error border when error prop is set', () => {
    render(<IntlWrapper><RecipientSearch {...defaultProps} error="Required" /></IntlWrapper>)
    const input = screen.getByPlaceholderText('Tìm kiếm')
    expect(input.className).toContain('border-[var(--color-error)]')
  })

  it('debounces search input and fetches users', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: '1', name: 'Nguyễn Văn A', avatar_url: null }]),
    })

    render(<IntlWrapper><RecipientSearch {...defaultProps} /></IntlWrapper>)
    const input = screen.getByPlaceholderText('Tìm kiếm')
    fireEvent.change(input, { target: { value: 'Nguyễn' } })

    // Wait for debounce (300ms) + fetch
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/users/search?q=Nguy%E1%BB%85n')
    }, { timeout: 1000 })
  })

  it('displays selected recipient name when value is set', () => {
    render(
      <IntlWrapper>
        <RecipientSearch
          {...defaultProps}
          value={{ id: '1', name: 'Nguyễn Văn A', avatar_url: null }}
        />
      </IntlWrapper>
    )
    const input = screen.getByDisplayValue('Nguyễn Văn A')
    expect(input).toBeInTheDocument()
  })
})
