import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardMetadataBox } from '@/app/_components/awards-information/award-metadata-box'

describe('AwardMetadataBox — quantity type', () => {
  it('renders the quantity label', () => {
    render(<AwardMetadataBox type="quantity" quantity={10} unit="Đơn vị" />)
    expect(screen.getByText('Số lượng giải thưởng:')).toBeInTheDocument()
  })

  it('renders the quantity number', () => {
    render(<AwardMetadataBox type="quantity" quantity={10} unit="Đơn vị" />)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders the unit', () => {
    render(<AwardMetadataBox type="quantity" quantity={10} unit="Đơn vị" />)
    expect(screen.getByText('Đơn vị')).toBeInTheDocument()
  })

  it('renders quantity label, number, and unit on a single row (flex-row container)', () => {
    const { container } = render(<AwardMetadataBox type="quantity" quantity={10} unit="Đơn vị" />)
    const box = container.firstChild as HTMLElement
    expect(box.className).toContain('flex-row')
    expect(box.className).toContain('items-center')
  })
})

describe('AwardMetadataBox — single prize type', () => {
  it('renders the prize label', () => {
    render(
      <AwardMetadataBox type="prize" prizeValue="7.000.000 VNĐ" subtitle="cho mỗi giải thưởng" />
    )
    expect(screen.getByText('Giá trị giải thưởng:')).toBeInTheDocument()
  })

  it('renders the prize value string', () => {
    render(
      <AwardMetadataBox type="prize" prizeValue="7.000.000 VNĐ" subtitle="cho mỗi giải thưởng" />
    )
    expect(screen.getByText('7.000.000 VNĐ')).toBeInTheDocument()
  })

  it('renders the subtitle text', () => {
    render(
      <AwardMetadataBox type="prize" prizeValue="7.000.000 VNĐ" subtitle="cho mỗi giải thưởng" />
    )
    expect(screen.getByText('cho mỗi giải thưởng')).toBeInTheDocument()
  })

  it('renders in a flex-col container', () => {
    const { container } = render(
      <AwardMetadataBox type="prize" prizeValue="7.000.000 VNĐ" subtitle="cho mỗi giải thưởng" />
    )
    const box = container.firstChild as HTMLElement
    expect(box.className).toContain('flex-col')
  })
})
