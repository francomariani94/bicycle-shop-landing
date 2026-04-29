import { test, expect } from '@playwright/test';

test('about section is visible with heading', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#about');
  await expect(section).toBeVisible();
  await expect(section).toContainText('About Fran');
});

test('about section has an image element', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#about img')).toBeVisible();
});
