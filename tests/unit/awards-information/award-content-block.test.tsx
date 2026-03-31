import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardContentBlock } from '@/app/_components/awards-information/award-content-block'

// Mock the async AwardMetadataBox server component
vi.mock('@/app/_components/awards-information/award-metadata-box', () => ({
  AwardMetadataBox: (props: Record<string, unknown>) => {
    if (props.type === 'quantity') {
      return (
        <div className="flex flex-row items-center gap-[16px]">
          <span>Số lượng giải thưởng:</span>
          <span>{String(props.quantity)}</span>
          <span>{props.unit as string}</span>
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-[16px]">
        <span>Giá trị giải thưởng:</span>
        <span>{props.prizeValue as string}</span>
        <span>{props.subtitle as string}</span>
      </div>
    )
  },
}))

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
