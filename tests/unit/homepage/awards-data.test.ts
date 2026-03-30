import { describe, it, expect } from 'vitest'
import { awardsData } from '@/libs/data/awards'

const EXPECTED_SLUGS = [
  'top-talent',
  'top-project',
  'top-project-leader',
  'best-manager',
  'signature-2025-creator',
  'mvp',
]

describe('awardsData', () => {
  it('exports exactly 6 award items', () => {
    expect(awardsData).toHaveLength(6)
  })

  it('each award has required fields (id, slug, name, description, imageUrl)', () => {
    awardsData.forEach((award) => {
      expect(award.id).toBeTruthy()
      expect(award.slug).toBeTruthy()
      expect(award.name).toBeTruthy()
      expect(award.description).toBeTruthy()
      expect(award.imageUrl).toBeTruthy()
    })
  })

  it('all slugs are kebab-case and match expected values', () => {
    const slugs = awardsData.map((a) => a.slug)
    expect(slugs).toEqual(EXPECTED_SLUGS)
  })

  it('all slugs are unique', () => {
    const slugs = awardsData.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(6)
  })

  it('all imageUrls start with /images/homepage/', () => {
    awardsData.forEach((award) => {
      expect(award.imageUrl).toMatch(/^\/images\/homepage\//)
    })
  })
})
