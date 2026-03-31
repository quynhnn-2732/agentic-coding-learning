import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RulesPanel } from '@/app/_components/sun-kudos/rules-panel'

describe('RulesPanel', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<RulesPanel isOpen={false} onClose={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders panel with role="dialog" when isOpen is true', () => {
    render(<RulesPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    render(<RulesPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('has aria-labelledby pointing to title', () => {
    render(<RulesPanel isOpen={true} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBe('rules-panel-title')
    expect(document.getElementById('rules-panel-title')).toBeInTheDocument()
  })

  it('renders title "Thể lệ"', () => {
    render(<RulesPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('Thể lệ')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(<RulesPanel isOpen={true} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders "Đóng" footer button that calls onClose', () => {
    const onClose = vi.fn()
    render(<RulesPanel isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByText('Đóng'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders "Viết KUDOS" footer button', () => {
    render(<RulesPanel isOpen={true} onClose={() => {}} />)
    expect(screen.getByText('Viết KUDOS')).toBeInTheDocument()
  })
})
