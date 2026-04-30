import { test, expect } from '@playwright/test';

test('footer is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toBeVisible();
});

test('footer has brand and copyright', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toContainText('KURUWA CYCLES');
  await expect(footer).toContainText('All rights reserved');
});
