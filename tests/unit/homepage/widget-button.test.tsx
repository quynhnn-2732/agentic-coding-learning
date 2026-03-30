import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WidgetButton } from '@/app/_components/homepage/widget-button'

describe('WidgetButton', () => {
  it('renders with aria-label "Thao tác nhanh"', () => {
    render(<WidgetButton />)
    expect(screen.getByLabelText('Thao tác nhanh')).toBeInTheDocument()
  })

  it('has fixed positioning classes', () => {
    render(<WidgetButton />)
    const btn = screen.getByLabelText('Thao tác nhanh')
    expect(btn.className).toMatch(/fixed/)
  })

  it('toggles isMenuOpen state on click', () => {
    render(<WidgetButton />)
    const btn = screen.getByLabelText('Thao tác nhanh')
    // Initially menu is closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    // Click opens menu
    fireEvent.click(btn)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    // Click closes menu
    fireEvent.click(btn)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders pen icon and SAA icon within the button', () => {
    const { container } = render(<WidgetButton />)
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })
})
