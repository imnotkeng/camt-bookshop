import { test, expect } from '@playwright/test';
import { signInAndExpectBooks, book } from './helpers';

test.describe('Catalogue', () => {
  test.beforeEach(async ({ page }) => {
    await signInAndExpectBooks(page);
  });

  test('lists all six books with prices', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.getByRole('article')).toHaveCount(6);
    await expect(book(page, 'Clean Code')).toContainText('850.00 THB');
  });

  test('search narrows the list by title', async ({ page }) => {
    await page.getByLabel('Search books').fill('refactor');

    await expect(page.getByRole('article')).toHaveCount(1);
    await expect(book(page, 'Refactoring')).toBeVisible();
  });

  test('search with no match says so', async ({ page }) => {
    await page.getByLabel('Search books').fill('cobol');

    await expect(page.getByText('No books match your search.')).toBeVisible();
    await expect(page.getByRole('article')).toHaveCount(0);
  });

  test('an out-of-stock book cannot be added', async ({ page }) => {
    await expect(book(page, 'Domain-Driven Design').getByRole('button', { name: 'Out of stock' })).toBeDisabled();
  });
});
