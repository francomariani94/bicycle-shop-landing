import { test, expect } from '@playwright/test';

test('nav has brand name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toContainText('KURUWA CYCLES');
});

test('nav has navigation links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="#services"]')).toBeVisible();
  await expect(page.locator('nav a[href="#about"]')).toBeVisible();
  await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
});
