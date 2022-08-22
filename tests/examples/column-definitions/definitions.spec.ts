import { expect, test, type Page } from '@playwright/test';

function getGrid(page: Page, index: number) {
  return page.locator(`div.ag-theme-alpine:nth-of-type(${index})`);
}

test.describe('Column Definitions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guide/column-definitions');
  });

  test('Page loads', async ({ page }) => {
    expect(page).toHaveTitle('Svelte AG Grid - Column Definitions');
    expect(await page.textContent('h1')).toBe('Svelte AG Grid - Column Definitions');
  });

  test('Column Definitions', async ({ page }) => {
    const grid = getGrid(page, 1);
    const headers = grid.locator('span.ag-header-cell-text');
    await expect(headers).toContainText(['Athlete', 'Gold', 'Age']);
  });

  test('Nested Row Data', async ({ page }) => {
    const grid = getGrid(page, 2);
    const golds = [8, 6, 4, 1, 2, 1, 4, 2, 3, 2, 3, 2, 1, 1, 3, 2, 1, 2, 2, 1];

    for (let i = 0; i < golds.length; i++) {
      const cell = grid.locator(`div[row-id="${i}"] div[col-id="medals.gold"]`);
      await expect(cell).toContainText(golds[i].toString());
    }
  });
});
