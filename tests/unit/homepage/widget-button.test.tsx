import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WidgetButton } from '@/app/_components/homepage/widget-button'
import { IntlWrapper } from '../../helpers/intl-wrapper'

// Mock RulesPanel to avoid importing the full component tree
vi.mock('@/app/_components/sun-kudos/rules-panel', () => ({
  RulesPanel: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? <div data-testid="rules-panel" role="dialog"><button onClick={onClose}>close-panel</button></div> : null,
}))

function renderWidget() {
  return render(
    <IntlWrapper>
      <WidgetButton />
    </IntlWrapper>
  )
}

describe('WidgetButton', () => {
  it('renders with aria-label "Thao tác nhanh"', () => {
    renderWidget()
    expect(screen.getByLabelText('Thao tác nhanh')).toBeInTheDocument()
  })

  it('has fixed positioning classes', () => {
    renderWidget()
    const btn = screen.getByLabelText('Thao tác nhanh')
    expect(btn.className).toMatch(/fixed/)
  })

  it('aria-expanded is false initially', () => {
    renderWidget()
    const btn = screen.getByLabelText('Thao tác nhanh')
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggles aria-expanded and shows menu on click', () => {
    renderWidget()
    const btn = screen.getByLabelText('Thao tác nhanh')
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('renders 3 menuitem buttons when expanded', () => {
    renderWidget()
    fireEvent.click(screen.getByLabelText('Thao tác nhanh'))
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)
  })

  it('renders "Thể lệ" button with correct text', () => {
    renderWidget()
    fireEvent.click(screen.getByLabelText('Thao tác nhanh'))
    expect(screen.getByText('Thể lệ')).toBeInTheDocument()
  })

  it('renders "Viết KUDOS" button with correct text', () => {
    renderWidget()
    fireEvent.click(screen.getByLabelText('Thao tác nhanh'))
    expect(screen.getByText('Viết KUDOS')).toBeInTheDocument()
  })

  it('collapses menu when Close button is clicked', () => {
    renderWidget()
    const fab = screen.getByLabelText('Thao tác nhanh')
    fireEvent.click(fab)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    const closeBtn = screen.getByLabelText('Đóng menu')
    fireEvent.click(closeBtn)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(fab.getAttribute('aria-expanded')).toBe('false')
  })

  it('collapses menu when Escape is pressed', () => {
    renderWidget()
    fireEvent.click(screen.getByLabelText('Thao tác nhanh'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens rules panel when "Thể lệ" is clicked', () => {
    renderWidget()
    fireEvent.click(screen.getByLabelText('Thao tác nhanh'))
    fireEvent.click(screen.getByText('Thể lệ'))

    expect(screen.getByTestId('rules-panel')).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders pen icon and SAA icon within the collapsed button', () => {
    const { container } = renderWidget()
    const svgs = container.querySelectorAll('button[aria-label="Thao tác nhanh"] svg')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })
})
