import { test, expect } from '@playwright/test';

test('page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Kuruwa Cycles/);
});

test('page has meta description', async ({ page }) => {
  await page.goto('/');
  const meta = page.locator('meta[name="description"]');
  await expect(meta).toHaveAttribute('content', /.+/);
});
