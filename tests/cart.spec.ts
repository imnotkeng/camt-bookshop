import { test, expect } from '@playwright/test';
import { signInAndExpectBooks, addToCart } from './helpers';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await signInAndExpectBooks(page);
  });

  test('adding a book updates the cart badge', { tag: '@smoke' }, async ({ page }) => {
    await addToCart(page, 'Clean Code');

    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('adding the same book twice increases the quantity', async ({ page }) => {
    await addToCart(page, 'Clean Code');
    await addToCart(page, 'Clean Code');
    await page.getByRole('link', { name: /Cart/ }).click();

    await expect(page.getByRole('row', { name: /Clean Code/ })).toContainText('1700.00 THB');
    await expect(page.getByTestId('cart-count')).toHaveText('2');
  });

  test('no member discount below 2,000 THB', async ({ page }) => {
    await addToCart(page, 'Clean Code');                       //   850
    await addToCart(page, 'Test-Driven Development: By Example'); // + 720 = 1570
    await page.getByRole('link', { name: /Cart/ }).click();

    await expect(page.getByTestId('subtotal')).toHaveText('1570.00 THB');
    await expect(page.getByTestId('discount')).toHaveCount(0);
    await expect(page.getByTestId('total')).toHaveText('1570.00 THB');
  });

  // Boundary value: the discount rule is "2,000 THB or more".
  test('member discount applies at exactly 2,000 THB', async ({ page }) => {
    await addToCart(page, 'Clean Code');   //  850
    await addToCart(page, 'Refactoring');  // 1150 = 2000
    await page.getByRole('link', { name: /Cart/ }).click();

    await expect(page.getByTestId('subtotal')).toHaveText('2000.00 THB');
    await expect(page.getByTestId('discount')).toHaveText('-200.00 THB');
    await expect(page.getByTestId('total')).toHaveText('1800.00 THB');
  });

  test('removing the last book empties the cart', async ({ page }) => {
    await addToCart(page, 'Refactoring');
    await page.getByRole('link', { name: /Cart/ }).click();

    await page.getByRole('button', { name: 'Remove Refactoring' }).click();

    await expect(page.getByText('Your cart is empty.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place order' })).toBeDisabled();
  });
});
