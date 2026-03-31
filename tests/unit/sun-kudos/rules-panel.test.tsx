import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RulesPanel } from '@/app/_components/sun-kudos/rules-panel'
import { IntlWrapper } from '../../helpers/intl-wrapper'

function renderPanel(props: { isOpen: boolean; onClose: () => void }) {
  return render(<IntlWrapper><RulesPanel {...props} /></IntlWrapper>)
}

describe('RulesPanel', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = renderPanel({ isOpen: false, onClose: () => {} })
    // IntlWrapper wraps content, but RulesPanel returns null
    expect(container.querySelector('[role="dialog"]')).toBeNull()
  })

  it('renders panel with role="dialog" when isOpen is true', () => {
    renderPanel({ isOpen: true, onClose: () => {} })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    renderPanel({ isOpen: true, onClose: () => {} })
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('has aria-labelledby pointing to title', () => {
    renderPanel({ isOpen: true, onClose: () => {} })
    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBe('rules-panel-title')
    expect(document.getElementById('rules-panel-title')).toBeInTheDocument()
  })

  it('renders title "Thể lệ"', () => {
    renderPanel({ isOpen: true, onClose: () => {} })
    expect(screen.getByText('Thể lệ')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    renderPanel({ isOpen: true, onClose })
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders "Đóng" footer button that calls onClose', () => {
    const onClose = vi.fn()
    renderPanel({ isOpen: true, onClose })
    fireEvent.click(screen.getByText('Đóng'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders "Viết KUDOS" footer button', () => {
    renderPanel({ isOpen: true, onClose: () => {} })
    expect(screen.getByText('Viết KUDOS')).toBeInTheDocument()
  })
})
