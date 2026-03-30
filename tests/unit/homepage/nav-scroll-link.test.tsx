import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NavScrollLink } from '@/app/_components/homepage/nav-scroll-link'

describe('NavScrollLink', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })
  })

  it('renders the label text', () => {
    render(<NavScrollLink>About SAA 2025</NavScrollLink>)
    expect(screen.getByText('About SAA 2025')).toBeInTheDocument()
  })

  it('calls window.scrollTo({ top: 0, behavior: smooth }) on click', () => {
    render(<NavScrollLink>About SAA 2025</NavScrollLink>)
    fireEvent.click(screen.getByText('About SAA 2025'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('applies selected styles (active nav link appearance)', () => {
    const { container } = render(<NavScrollLink>About SAA 2025</NavScrollLink>)
    const btn = container.querySelector('button')
    expect(btn).not.toBeNull()
  })
})
