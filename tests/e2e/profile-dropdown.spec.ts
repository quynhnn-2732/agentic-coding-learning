import { test, expect } from '@playwright/test'

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

test.describe('Profile Dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await mockSupabaseAuth(page)
  })

  test('opens dropdown with Profile and Logout items on avatar click', async ({
    page,
  }) => {
    await page.goto('/')

    const trigger = page.getByLabel('Tài khoản')
    await trigger.click()

    const menu = page.getByRole('menu')
    await expect(menu).toBeVisible()

    await expect(
      page.getByRole('menuitem', { name: /profile/i })
    ).toBeVisible()
    await expect(
      page.getByRole('menuitem', { name: /logout/i })
    ).toBeVisible()
  })

  test('closes dropdown when clicking outside', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Tài khoản').click()
    await expect(page.getByRole('menu')).toBeVisible()

    // Click on body outside the dropdown
    await page.locator('header').click({ position: { x: 10, y: 10 } })

    await expect(page.getByRole('menu')).not.toBeVisible()
  })

  test('closes dropdown on Escape key', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Tài khoản').click()
    await expect(page.getByRole('menu')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByRole('menu')).not.toBeVisible()
  })

  test('navigates to /profile when Profile item is clicked', async ({
    page,
  }) => {
    await page.goto('/')

    await page.getByLabel('Tài khoản').click()
    await page.getByRole('menuitem', { name: /profile/i }).click()

    await expect(page).toHaveURL(/\/profile/)
  })

  test('keyboard navigation with Arrow keys and Enter', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Tài khoản').click()
    await expect(page.getByRole('menu')).toBeVisible()

    // Arrow Down focuses first item
    await page.keyboard.press('ArrowDown')
    const profileItem = page.getByRole('menuitem', { name: /profile/i })
    await expect(profileItem).toBeFocused()

    // Arrow Down focuses second item
    await page.keyboard.press('ArrowDown')
    const logoutItem = page.getByRole('menuitem', { name: /logout/i })
    await expect(logoutItem).toBeFocused()

    // Arrow Up goes back
    await page.keyboard.press('ArrowUp')
    await expect(profileItem).toBeFocused()
  })
})
