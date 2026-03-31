import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RulesPanelContent } from '@/app/_components/sun-kudos/rules-panel-content'
import { IntlWrapper } from '../../helpers/intl-wrapper'

describe('RulesPanelContent', () => {
  it('renders "Người nhận Kudos" section heading', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText(/NGƯỜI NHẬN KUDOS/)).toBeInTheDocument()
  })

  it('renders 4 Hero badge tiers', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText('New Hero')).toBeInTheDocument()
    expect(screen.getByText('Rising Hero')).toBeInTheDocument()
    expect(screen.getByText('Super Hero')).toBeInTheDocument()
    expect(screen.getByText('Legend Hero')).toBeInTheDocument()
  })

  it('renders threshold text for each tier', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText(/Có 1-4 người gửi Kudos cho bạn/)).toBeInTheDocument()
    expect(screen.getByText(/Có 5-9 người gửi Kudos cho bạn/)).toBeInTheDocument()
    expect(screen.getByText(/Có 10–20 người gửi Kudos cho bạn/)).toBeInTheDocument()
    expect(screen.getByText(/Có hơn 20 người gửi Kudos cho bạn/)).toBeInTheDocument()
  })

  it('renders "Người gửi Kudos" section heading', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText(/NGƯỜI GỬI KUDOS/)).toBeInTheDocument()
  })

  it('renders 6 collectible icon names', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText('REVIVAL')).toBeInTheDocument()
    expect(screen.getByText('TOUCH OF LIGHT')).toBeInTheDocument()
    expect(screen.getByText('STAY GOLD')).toBeInTheDocument()
    expect(screen.getByText('FLOW TO HORIZON')).toBeInTheDocument()
    expect(screen.getByText('BEYOND THE BOUNDARY')).toBeInTheDocument()
    expect(screen.getByText('ROOT FURTHER')).toBeInTheDocument()
  })

  it('renders "KUDOS QUỐC DÂN" section heading', () => {
    render(<IntlWrapper><RulesPanelContent /></IntlWrapper>)
    expect(screen.getByText('KUDOS QUỐC DÂN')).toBeInTheDocument()
  })
})
