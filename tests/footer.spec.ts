import { test, expect } from '@playwright/test';

test('footer shows brand name and location', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText("Fran's Bike Atelier");
});
