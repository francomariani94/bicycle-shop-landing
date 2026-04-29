import { test, expect } from '@playwright/test';

test('nav shows brand name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav')).toContainText("Fran's Bike");
  await expect(page.locator('nav')).toContainText('Atelier');
});

test('nav has anchor links to page sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav a[href="#services"]')).toBeVisible();
  await expect(page.locator('nav a[href="#about"]')).toBeVisible();
  await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
});
