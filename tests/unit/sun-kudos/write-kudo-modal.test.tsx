import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WriteKudoModal } from '@/app/_components/sun-kudos/write-kudo/write-kudo-modal'

describe('WriteKudoModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
    initialHashtags: [],
  }

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <WriteKudoModal {...defaultProps} isOpen={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders modal with role="dialog" when isOpen is true', () => {
    render(<WriteKudoModal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    render(<WriteKudoModal {...defaultProps} />)
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('renders modal title', () => {
    render(<WriteKudoModal {...defaultProps} />)
    expect(
      screen.getByText('Gửi lời cám ơn và ghi nhận đến đồng đội')
    ).toBeInTheDocument()
  })

  it('renders Cancel and Submit buttons', () => {
    render(<WriteKudoModal {...defaultProps} />)
    expect(screen.getByRole('button', { name: /hủy/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gửi/i })).toBeInTheDocument()
  })

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = vi.fn()
    render(<WriteKudoModal {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /hủy/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(<WriteKudoModal {...defaultProps} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn()
    render(<WriteKudoModal {...defaultProps} onClose={onClose} />)
    const overlay = screen.getByTestId('modal-overlay')
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when modal content is clicked', () => {
    const onClose = vi.fn()
    render(<WriteKudoModal {...defaultProps} onClose={onClose} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('Submit button is disabled by default (no fields filled)', () => {
    render(<WriteKudoModal {...defaultProps} />)
    expect(screen.getByRole('button', { name: /gửi/i })).toBeDisabled()
  })
})
