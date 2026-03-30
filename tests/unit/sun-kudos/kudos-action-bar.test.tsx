import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { KudosActionBar } from '@/app/_components/sun-kudos/kudos-action-bar'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}))

describe('KudosActionBar', () => {
  it('renders "Ghi nhận" pill linking to /write-kudo', () => {
    render(<KudosActionBar />)
    const link = screen.getByText(/Hôm nay, bạn muốn gửi lời cảm ơn/).closest('a')
    expect(link).toBeDefined()
    expect(link?.getAttribute('href')).toBe('/write-kudo')
  })

  it('renders "Tìm kiếm sunner" pill button', () => {
    render(<KudosActionBar />)
    expect(screen.getByText('Tìm kiếm profile Sunner')).toBeDefined()
  })
})
