import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { KudosActionBar } from '@/app/_components/sun-kudos/kudos-action-bar'
import { IntlWrapper } from '../../helpers/intl-wrapper'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}))

describe('KudosActionBar', () => {
  it('renders "Ghi nhận" pill linking to /write-kudo', () => {
    render(<IntlWrapper><KudosActionBar /></IntlWrapper>)
    const link = screen.getByText(/Hôm nay, bạn muốn gửi lời cảm ơn/).closest('a')
    expect(link).toBeDefined()
    expect(link?.getAttribute('href')).toBe('/write-kudo')
  })

  it('renders "Tìm kiếm sunner" pill button', () => {
    render(<IntlWrapper><KudosActionBar /></IntlWrapper>)
    expect(screen.getByText('Tìm kiếm profile Sunner')).toBeDefined()
  })
})
