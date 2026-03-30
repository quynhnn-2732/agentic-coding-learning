import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardContentBlock } from '@/app/_components/awards-information/award-content-block'

const baseProps = {
  name: 'Top Talent',
  description: 'Vinh danh cá nhân xuất sắc với năng lực vượt trội.',
  quantity: 10,
  unit: 'Đơn vị' as const,
  prizeValue: '7.000.000 VNĐ',
}

describe('AwardContentBlock', () => {
  it('renders the award name in an h2 heading', () => {
    render(<AwardContentBlock {...baseProps} />)
    const heading = screen.getByRole('heading', { level: 2, name: 'Top Talent' })
    expect(heading).toBeInTheDocument()
  })

  it('renders the description paragraph', () => {
    render(<AwardContentBlock {...baseProps} />)
    expect(screen.getByText(/vinh danh cá nhân xuất sắc/i)).toBeInTheDocument()
  })

  it('renders the quantity metadata box', () => {
    render(<AwardContentBlock {...baseProps} />)
    expect(screen.getByText('Số lượng giải thưởng:')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Đơn vị')).toBeInTheDocument()
  })

  it('renders the prize metadata box with value and subtitle', () => {
    render(<AwardContentBlock {...baseProps} />)
    expect(screen.getByText('Giá trị giải thưởng:')).toBeInTheDocument()
    expect(screen.getByText('7.000.000 VNĐ')).toBeInTheDocument()
    expect(screen.getByText('cho mỗi giải thưởng')).toBeInTheDocument()
  })

  it('renders dual prize with "Hoặc" divider and per-prize subtitles for Signature award', () => {
    render(
      <AwardContentBlock
        {...baseProps}
        prizeValue={{ individual: '5.000.000 VNĐ', team: '8.000.000 VNĐ' }}
      />
    )
    expect(screen.getByText('5.000.000 VNĐ')).toBeInTheDocument()
    expect(screen.getByText('cho giải cá nhân')).toBeInTheDocument()
    expect(screen.getByText('Hoặc')).toBeInTheDocument()
    expect(screen.getByText('8.000.000 VNĐ')).toBeInTheDocument()
    expect(screen.getByText('cho giải tập thể')).toBeInTheDocument()
  })
})
