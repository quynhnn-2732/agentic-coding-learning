import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CloseIcon } from '@/app/_components/icons/close-icon'

describe('CloseIcon', () => {
  it('renders SVG with default 24x24 size', () => {
    const { container } = render(<CloseIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.getAttribute('width')).toBe('24')
    expect(svg?.getAttribute('height')).toBe('24')
  })

  it('accepts size prop', () => {
    const { container } = render(<CloseIcon size={32} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('32')
    expect(svg?.getAttribute('height')).toBe('32')
  })

  it('accepts color prop', () => {
    const { container } = render(<CloseIcon color="red" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('stroke')).toBe('red')
  })

  it('uses currentColor by default', () => {
    const { container } = render(<CloseIcon />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('stroke')).toBe('currentColor')
  })

  it('has aria-hidden="true"', () => {
    const { container } = render(<CloseIcon />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })
})
