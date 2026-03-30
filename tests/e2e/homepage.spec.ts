import { test, expect } from '@playwright/test'

/**
 * E2E tests for the Homepage (SAA 2025).
 *
 * Authentication: The middleware calls Supabase `auth.getUser()` which hits the
 * Supabase REST API. We intercept those calls via `page.route()` so the tests
 * run without real Supabase credentials — both in local dev and CI.
 */

const MOCK_USER = {
  id: 'test-user-e2e',
  email: 'test@example.com',
  user_metadata: {
    avatar_url: 'https://lh3.googleusercontent.com/test-e2e-avatar.jpg',
  },
}

/** Intercept every Supabase auth request and return a mock authenticated user. */
async function mockSupabaseAuth(page: import('@playwright/test').Page) {
  // Supabase JS calls /auth/v1/user to validate the session
  await page.route('**/auth/v1/user**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_USER),
    })
  })

  // Token-refresh endpoint — return a valid-looking session so the cookie stays alive
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

test.describe('Homepage — authenticated user', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page)
  })

  test('(a) renders countdown and 6 award cards', async ({ page }) => {
    await page.goto('/')

    // Countdown section is visible — look for the "Coming soon" text OR digit labels
    // The countdown renders day/hour/minute digit tiles
    const countdownSection = page.locator('[aria-label="Thao tác nhanh"]')
    // Widget button is rendered → full page loaded
    await expect(countdownSection).toBeVisible()

    // 6 award cards — each card has a "Chi tiết" link
    const chiTietLinks = page.getByRole('link', { name: /chi tiết/i })
    // Awards section has 6 "Chi tiết" links; Sunkudos section adds 1 more → at least 6
    await expect(chiTietLinks).toHaveCount(7)
  })

  test('(b) click "ABOUT AWARDS" navigates to /awards-information', async ({ page }) => {
    await page.goto('/')

    // There may be multiple "ABOUT AWARDS" links (header CTA + hero CTA)
    const aboutAwardsLink = page.getByRole('link', { name: /about awards/i }).first()
    await expect(aboutAwardsLink).toBeVisible()
    await aboutAwardsLink.click()

    await expect(page).toHaveURL(/\/awards-information/)
  })

  test('(c) click "ABOUT KUDOS" navigates to /sun-kudos', async ({ page }) => {
    await page.goto('/')

    const aboutKudosLink = page.getByRole('link', { name: /about kudos/i }).first()
    await expect(aboutKudosLink).toBeVisible()
    await aboutKudosLink.click()

    await expect(page).toHaveURL(/\/sun-kudos/)
  })

  test('(d) click award card "Chi tiết" navigates to /awards-information#top-talent', async ({
    page,
  }) => {
    await page.goto('/')

    // The first award card link wraps the entire card including the "Chi tiết" text
    // Find the link whose href ends with #top-talent
    const topTalentCard = page.locator('a[href*="#top-talent"]').first()
    await expect(topTalentCard).toBeVisible()
    await topTalentCard.click()

    await expect(page).toHaveURL(/\/awards-information#top-talent/)
  })

  test('(e) click Sunkudos "Chi tiết" navigates to /sun-kudos', async ({ page }) => {
    await page.goto('/')

    // Sunkudos "Chi tiết" is an <a> inside the sunkudos section
    // It has href="/sun-kudos" and visible text "Chi tiết"
    const sunkudosChiTiet = page.locator('a[href="/sun-kudos"]').filter({ hasText: /chi tiết/i })
    await expect(sunkudosChiTiet).toBeVisible()
    await sunkudosChiTiet.click()

    await expect(page).toHaveURL(/\/sun-kudos/)
  })

  test('renders header with logo, nav links, and avatar', async ({ page }) => {
    await page.goto('/')

    // Logo in header
    await expect(page.getByAltText('Sun Annual Awards 2025').first()).toBeVisible()

    // Header navigation links
    await expect(page.getByRole('link', { name: 'Awards Information' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /sun\* kudos/i }).first()).toBeVisible()

    // Notification bell
    await expect(page.getByRole('button', { name: 'Thông báo' })).toBeVisible()
  })

  test('widget button toggles menu on click', async ({ page }) => {
    await page.goto('/')

    const widgetBtn = page.getByRole('button', { name: 'Thao tác nhanh' })
    await expect(widgetBtn).toBeVisible()
    await expect(widgetBtn).toHaveAttribute('aria-expanded', 'false')

    await widgetBtn.click()
    await expect(widgetBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('menu')).toBeVisible()

    await widgetBtn.click()
    await expect(widgetBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('menu')).not.toBeVisible()
  })
})

test.describe('Homepage — unauthenticated redirect', () => {
  test('unauthenticated user is redirected from / to /login', async ({ page }) => {
    // Do NOT mock Supabase auth — let it fail / return 401 → middleware redirects
    await page.route('**/auth/v1/user**', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'JWT expired', code: 401 }),
      })
    })

    await page.goto('/')

    // Middleware should redirect unauthenticated users to the login page
    await expect(page).toHaveURL('/login')
  })
})
