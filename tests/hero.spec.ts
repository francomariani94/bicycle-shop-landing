import { test, expect } from '@playwright/test';

test('hero section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero')).toBeVisible();
});

test('hero has CTA button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#hero a[href="#contact"]')).toBeVisible();
});
