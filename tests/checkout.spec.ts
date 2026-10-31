import { test, expect } from '@playwright/test';
import { signInAndExpectBooks, addToCart } from './helpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await signInAndExpectBooks(page);
  });

  test('placing an order shows a confirmation and empties the cart', { tag: '@smoke' }, async ({ page }) => {
    await addToCart(page, 'Continuous Delivery');
    await page.getByRole('link', { name: /Cart/ }).click();

    await page.getByRole('button', { name: 'Place order' }).click();

    await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
    await expect(page.getByTestId('order-ref')).toHaveText(/^BK-\d{4}$/);
    await expect(page.getByTestId('order-total')).toHaveText('1290.00 THB');
    await expect(page.getByTestId('cart-count')).toHaveCount(0);
  });

  test('the discounted total is what the reader pays', async ({ page }) => {
    await addToCart(page, 'Clean Code');
    await addToCart(page, 'Refactoring');
    await page.getByRole('link', { name: /Cart/ }).click();

    await page.getByRole('button', { name: 'Place order' }).click();

    await expect(page.getByTestId('order-total')).toHaveText('1800.00 THB');
  });
});
