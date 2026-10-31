import { test, expect } from '@playwright/test';
import { signInAndExpectBooks, addToCart } from './helpers';

// The USD conversion comes from a third-party exchange-rate service (GET rates.json).
// Run this file ten times and count the results before you decide what it is.

test.describe('Currency conversion', () => {
  test('the cart shows the total in USD', async ({ page }) => {
    await signInAndExpectBooks(page);
    await addToCart(page, 'Test-Driven Development: By Example');   // 720 THB
    await page.getByRole('link', { name: /Cart/ }).click();

    await expect(page.getByTestId('fx')).toHaveText('≈ 19.73 USD');
  });
});
