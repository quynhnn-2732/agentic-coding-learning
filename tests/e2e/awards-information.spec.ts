import { test, expect } from '@playwright/test'

/**
 * E2E tests for the Awards Information page (/awards-information).
 * Covers US2 (sidebar scroll navigation) and US3 (Sun* Kudos CTA).
 * Auth is mocked via page.route() interception.
 */

const MOCK_USER = {
  id: 'test-user-e2e',
  email: 'test@example.com',
  user_metadata: {
    avatar_url: 'https://lh3.googleusercontent.com/test-e2e-avatar.jpg',
  },
}

async function mockSupabaseAuth(page: import('@playwright/test').Page) {
  await page.route('**/auth/v1/user**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_USER),
    })
  })
  await page.route('**/auth/v1/token**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'mock-access-token',
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        user: MOCK_USER,
      }),
    })
  })
}

test.describe('Awards Information — authenticated user', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page)
    await page.goto('/awards-information')
  })

  // --- US1: All 6 award entries render ---

  test('renders the page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: /hệ thống giải thưởng saa 2025/i })
    ).toBeVisible()
  })

  test('renders all 6 award sections', async ({ page }) => {
    const slugs = [
      'top-talent',
      'top-project',
      'top-project-leader',
      'best-manager',
      'signature-2025-creator',
      'mvp',
    ]
    for (const slug of slugs) {
      await expect(page.locator(`section#${slug}`)).toBeVisible()
    }
  })

  test('Signature 2025 award shows dual prize values with "Hoặc" divider', async ({ page }) => {
    const signatureSection = page.locator('section#signature-2025-creator')
    await expect(signatureSection.getByText('5.000.000 VNĐ').first()).toBeVisible()
    await expect(signatureSection.getByText('Hoặc')).toBeVisible()
    await expect(signatureSection.getByText('8.000.000 VNĐ').first()).toBeVisible()
  })

  // --- US2: Sidebar scroll navigation ---

  test('sidebar is visible on desktop and contains 6 nav buttons', async ({ page }) => {
    const sidebar = page.getByRole('navigation', { name: 'Award categories' })
    await expect(sidebar).toBeVisible()
    const buttons = sidebar.getByRole('button')
    await expect(buttons).toHaveCount(6)
  })

  test('sidebar is hidden on mobile (375px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const sidebarWrapper = page.locator('div.hidden.md\\:block').first()
    // On mobile the wrapper has 'display: none' via hidden class
    await expect(sidebarWrapper).toBeHidden()
  })

  test('click sidebar item scrolls to corresponding award section', async ({ page }) => {
    const bestManagerBtn = page
      .getByRole('navigation', { name: 'Award categories' })
      .getByRole('button', { name: 'Best Manager' })
    await expect(bestManagerBtn).toBeVisible()
    await bestManagerBtn.click()

    // After scrolling, the Best Manager section should be in/near the viewport
    const bestManagerSection = page.locator('section#best-manager')
    await expect(bestManagerSection).toBeInViewport({ ratio: 0.1 })
  })

  // --- US3: Sun* Kudos section ---

  test('Sun* Kudos section is visible at the bottom of the page', async ({ page }) => {
    // Scroll to bottom to reveal Kudos section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.getByText('Phong trào ghi nhận')).toBeVisible()
    await expect(page.getByText('Sun* Kudos').last()).toBeVisible()
  })

  test('clicking "Chi tiết" in Kudos section navigates to /sun-kudos', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const chiTietLink = page.locator('a[href="/sun-kudos"]').filter({ hasText: /chi tiết/i })
    await expect(chiTietLink).toBeVisible()
    await chiTietLink.click()
    await expect(page).toHaveURL(/\/sun-kudos/)
  })
})

test.describe('Awards Information — unauthenticated redirect', () => {
  test('unauthenticated user is redirected to /login', async ({ page }) => {
    await page.route('**/auth/v1/user**', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'JWT expired', code: 401 }),
      })
    })
    await page.goto('/awards-information')
    await expect(page).toHaveURL('/login')
  })
})
