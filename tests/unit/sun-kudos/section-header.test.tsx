import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionHeader } from '@/app/_components/sun-kudos/section-header'

describe('SectionHeader', () => {
  it('renders default subtitle and title', () => {
    render(<SectionHeader title="HIGHLIGHT KUDOS" />)
    expect(screen.getByText('Sun* Annual Awards 2025')).toBeDefined()
    expect(screen.getByText('HIGHLIGHT KUDOS')).toBeDefined()
  })

  it('renders custom subtitle', () => {
    render(<SectionHeader subtitle="Custom Sub" title="ALL KUDOS" />)
    expect(screen.getByText('Custom Sub')).toBeDefined()
    expect(screen.getByText('ALL KUDOS')).toBeDefined()
  })

  it('renders a divider line', () => {
    const { container } = render(<SectionHeader title="TEST" />)
    const divider = container.querySelector('.h-px')
    expect(divider).toBeDefined()
  })
})
