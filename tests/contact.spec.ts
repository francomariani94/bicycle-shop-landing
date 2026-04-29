import { test, expect } from '@playwright/test';

test('contact section is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section#contact')).toBeVisible();
});

test('WhatsApp button has valid wa.me link', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('a[href^="https://wa.me/"]');
  await expect(btn).toBeVisible();
  const href = await btn.getAttribute('href');
  expect(href).toMatch(/^https:\/\/wa\.me\/\d+/);
});

test('contact form has required fields', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('form');
  await expect(form.locator('input[name="name"]')).toBeVisible();
  await expect(form.locator('input[name="email"]')).toBeVisible();
  await expect(form.locator('textarea[name="message"]')).toBeVisible();
  await expect(form.locator('button[type="submit"]')).toBeVisible();
});
