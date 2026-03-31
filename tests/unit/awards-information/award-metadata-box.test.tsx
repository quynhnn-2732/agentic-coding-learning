import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AwardMetadataBox } from '@/app/_components/awards-information/award-metadata-box'
import { IntlWrapper } from '../../helpers/intl-wrapper'
import messages from '../../../messages/vi.json'

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (namespace: string) => {
    const ns = messages[namespace as keyof typeof messages] as Record<string, string>
    return (key: string) => ns?.[key] ?? key
  }),
}))

describe('AwardMetadataBox — quantity type', () => {
  it('renders the quantity label', async () => {
    const jsx = await AwardMetadataBox({ type: 'quantity', quantity: 10, unit: 'Đơn vị' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('Số lượng giải thưởng:')).toBeInTheDocument()
  })

  it('renders the quantity number', async () => {
    const jsx = await AwardMetadataBox({ type: 'quantity', quantity: 10, unit: 'Đơn vị' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders the unit', async () => {
    const jsx = await AwardMetadataBox({ type: 'quantity', quantity: 10, unit: 'Đơn vị' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('Đơn vị')).toBeInTheDocument()
  })

  it('renders quantity label, number, and unit on a single row (flex-row container)', async () => {
    const jsx = await AwardMetadataBox({ type: 'quantity', quantity: 10, unit: 'Đơn vị' })
    const { container } = render(<IntlWrapper>{jsx}</IntlWrapper>)
    const box = container.firstChild as HTMLElement
    expect(box.className).toContain('flex-row')
    expect(box.className).toContain('items-center')
  })
})

describe('AwardMetadataBox — single prize type', () => {
  it('renders the prize label', async () => {
    const jsx = await AwardMetadataBox({ type: 'prize', prizeValue: '7.000.000 VNĐ', subtitle: 'cho mỗi giải thưởng' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('Giá trị giải thưởng:')).toBeInTheDocument()
  })

  it('renders the prize value string', async () => {
    const jsx = await AwardMetadataBox({ type: 'prize', prizeValue: '7.000.000 VNĐ', subtitle: 'cho mỗi giải thưởng' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('7.000.000 VNĐ')).toBeInTheDocument()
  })

  it('renders the subtitle text', async () => {
    const jsx = await AwardMetadataBox({ type: 'prize', prizeValue: '7.000.000 VNĐ', subtitle: 'cho mỗi giải thưởng' })
    render(<IntlWrapper>{jsx}</IntlWrapper>)
    expect(screen.getByText('cho mỗi giải thưởng')).toBeInTheDocument()
  })

  it('renders in a flex-col container', async () => {
    const jsx = await AwardMetadataBox({ type: 'prize', prizeValue: '7.000.000 VNĐ', subtitle: 'cho mỗi giải thưởng' })
    const { container } = render(<IntlWrapper>{jsx}</IntlWrapper>)
    const box = container.firstChild as HTMLElement
    expect(box.className).toContain('flex-col')
  })
})
