import { expect, type Page } from '@playwright/test';

// The demo account. These two literals are the first thing your pipeline must remove
// from the repository — see PL-02 in the pipeline specification.
export const USER = process.env.TEST_USER;
export const PASS = process.env.TEST_PASS;

if (!USER) {
  throw new Error('Missing environment variable: TEST_USER');
}

if (!PASS) {
  throw new Error('Missing environment variable: TEST_PASS');
}

export async function signIn(page: Page, email = USER, password = PASS): Promise<void> {
  await page.goto('/signin');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

export async function signInAndExpectBooks(page: Page): Promise<void> {
  await signIn(page);
  await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
}

export function book(page: Page, title: string) {
  return page.getByRole('article', { name: title, exact: true });
}

export async function addToCart(page: Page, title: string): Promise<void> {
  await book(page, title).getByRole('button', { name: 'Add to cart' }).click();
}
