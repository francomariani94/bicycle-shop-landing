import { test, expect } from '@playwright/test';

test('CTA section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#contact')).toBeVisible();
});

test('CTA section has action buttons', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('section#contact');
  await expect(section).toContainText('GET IN TOUCH');
  await expect(section).toContainText('SEND A MESSAGE');
});
