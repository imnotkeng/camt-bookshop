import { test, expect } from '@playwright/test';
import { signIn, signInAndExpectBooks, USER } from './helpers';

test.describe('Sign in', () => {
  test('a registered reader reaches the catalogue', { tag: '@smoke' }, async ({ page }) => {
    await signIn(page);

    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText(`Signed in as ${USER}`)).toBeVisible();
  });

  test('a wrong password is rejected with a message', async ({ page }) => {
    await signIn(page, USER, 'not-the-password');

    await expect(page.getByRole('alert')).toHaveText('Incorrect email or password.');
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  });

  test('signing out returns to the sign-in page', async ({ page }) => {
    await signInAndExpectBooks(page);

    await page.getByRole('button', { name: 'Sign out' }).click();

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  });

  test('the catalogue cannot be opened without signing in', async ({ page }) => {
    await page.goto('/books');

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  });
});
