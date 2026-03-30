import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { awardsData } from '@/libs/data/awards'

// --- IntersectionObserver mock (must be before component import) ---
let capturedIOCallback: IntersectionObserverCallback = () => {}
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    capturedIOCallback = cb
  }
  observe = mockObserve
  disconnect = mockDisconnect
  unobserve = vi.fn()
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

import { AwardSidebar } from '@/app/_components/awards-information/award-sidebar'

describe('AwardSidebar', () => {
  beforeEach(() => {
    mockObserve.mockClear()
    mockDisconnect.mockClear()
    // jsdom does not implement scrollIntoView — provide a no-op
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('renders navigation with aria-label="Award categories"', () => {
    render(<AwardSidebar />)
    expect(
      screen.getByRole('navigation', { name: 'Award categories' })
    ).toBeInTheDocument()
  })

  it('renders exactly 6 navigation buttons', () => {
    render(<AwardSidebar />)
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  it('renders buttons with correct award names', () => {
    render(<AwardSidebar />)
    awardsData.forEach((award) => {
      expect(screen.getByRole('button', { name: award.name })).toBeInTheDocument()
    })
  })

  it('first button (Top Talent) is active on initial render with aria-current="true"', () => {
    render(<AwardSidebar />)
    expect(screen.getByRole('button', { name: 'Top Talent' })).toHaveAttribute(
      'aria-current',
      'true'
    )
  })

  it('other buttons do not have aria-current by default', () => {
    render(<AwardSidebar />)
    const otherButtons = awardsData.slice(1).map((award) =>
      screen.getByRole('button', { name: award.name })
    )
    otherButtons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('aria-current')
    })
  })

  it('click on a button calls scrollIntoView on the matching section element', () => {
    const section = document.createElement('section')
    section.id = 'best-manager'
    document.body.appendChild(section)

    render(<AwardSidebar />)
    fireEvent.click(screen.getByRole('button', { name: 'Best Manager' }))

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(section)
  })

  it('updates active slug when IntersectionObserver fires with isIntersecting: true', () => {
    // Create section elements for the observer to target
    const sections = awardsData.map((award) => {
      const el = document.createElement('section')
      el.id = award.slug
      document.body.appendChild(el)
      return el
    })

    render(<AwardSidebar />)

    const bestManagerEl = document.getElementById('best-manager')!
    act(() => {
      capturedIOCallback(
        [{ isIntersecting: true, target: bestManagerEl } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(screen.getByRole('button', { name: 'Best Manager' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Top Talent' })).not.toHaveAttribute(
      'aria-current'
    )

    sections.forEach((el) => document.body.removeChild(el))
  })

  it('does not update active slug when entry is not intersecting', () => {
    render(<AwardSidebar />)

    const fakeEl = document.createElement('section')
    fakeEl.id = 'top-project'
    act(() => {
      capturedIOCallback(
        [{ isIntersecting: false, target: fakeEl } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    // Top Talent should still be active
    expect(screen.getByRole('button', { name: 'Top Talent' })).toHaveAttribute(
      'aria-current',
      'true'
    )
  })
})
