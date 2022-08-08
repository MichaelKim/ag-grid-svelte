import { expect, test } from '@playwright/test';

test.describe('Column Definitions', () => {
  test('Page loads', async ({ page }) => {
    await page.goto('/guide/column-definitions');
    expect(page).toHaveTitle('Svelte AG Grid - Column Definitions');
    expect(await page.textContent('h1')).toBe('Svelte AG Grid - Column Definitions');
  });

  test('Column Definitions', async ({ page }) => {
    await page.goto('/guide/column-definitions');
    const grid = page.locator('div.ag-theme-alpine').first();
    const headers = grid.locator('span.ag-header-cell-text');
    await expect(headers).toContainText(['Athlete', 'Gold', 'Age']);
  });
});
