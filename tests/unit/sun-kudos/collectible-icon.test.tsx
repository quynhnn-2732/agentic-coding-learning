import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CollectibleIcon } from '@/app/_components/sun-kudos/collectible-icon'

describe('CollectibleIcon', () => {
  it('renders name label', () => {
    render(<CollectibleIcon name="REVIVAL" imageSrc="/images/rules/icon-revival.png" />)
    expect(screen.getByText('REVIVAL')).toBeInTheDocument()
  })

  it('renders image with next/image', () => {
    const { container } = render(
      <CollectibleIcon name="STAY GOLD" imageSrc="/images/rules/icon-stay-gold.png" />
    )
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
  })

  it('has circular image styling (rounded-full, border)', () => {
    const { container } = render(
      <CollectibleIcon name="REVIVAL" imageSrc="/images/rules/icon-revival.png" />
    )
    const imageWrapper = container.querySelector('[class*="rounded-full"]')
    expect(imageWrapper).toBeInTheDocument()
  })

  it('shows fallback placeholder when image fails to load', () => {
    const { container } = render(
      <CollectibleIcon name="REVIVAL" imageSrc="/images/rules/broken.png" />
    )
    const img = container.querySelector('img')
    if (img) {
      fireEvent.error(img)
    }
    const fallback = container.querySelector('[data-testid="icon-fallback"]')
    expect(fallback).toBeInTheDocument()
  })

  it('has centered layout with gap', () => {
    const { container } = render(
      <CollectibleIcon name="REVIVAL" imageSrc="/images/rules/icon-revival.png" />
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper.className).toMatch(/flex/)
    expect(wrapper.className).toMatch(/flex-col/)
    expect(wrapper.className).toMatch(/items-center/)
  })
})
