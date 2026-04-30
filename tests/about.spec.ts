import { test, expect } from '@playwright/test';

test('philosophy section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#about')).toBeVisible();
});

test('philosophy section has headline', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#about');
  await expect(section).toContainText('EVERY BIKE');
  await expect(section).toContainText('IS PERSONAL');
});
