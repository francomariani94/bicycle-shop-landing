import { test, expect } from '@playwright/test';

test('services section has 4 cards', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toBeVisible();
  await expect(section.locator('[data-service]')).toHaveCount(4);
});

test('services section has all expected service names', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#services');
  await expect(section).toContainText('Repairs & Tune-ups');
  await expect(section).toContainText('Custom Builds');
  await expect(section).toContainText('Emergency');
  await expect(section).toContainText('Mobile or Workshop');
});
