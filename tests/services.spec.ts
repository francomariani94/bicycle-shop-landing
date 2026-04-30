import { test, expect } from '@playwright/test';

test('services section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#services')).toBeVisible();
});

test('services section has 3 service cards', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toContainText('TUNE-UP');
  await expect(section).toContainText('RESTORATION');
  await expect(section).toContainText('CUSTOM BUILD');
});
