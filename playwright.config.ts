import { defineConfig, devices } from '@playwright/test';

import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if (existsSync('tests/.env')) {
  loadEnvFile('tests/.env');
}

const targetURL = process.env.BASE_URL;
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;


// Starter configuration — LOCAL ONLY.
//
// It builds the Nuxt app, starts it on port 3000 and runs the whole suite on three
// browsers. Nothing in here knows about CI, Vercel, environments or secrets yet: making it
// do so is your job (PL-02 in the pipeline specification). Do not create a second config
// file for CI — one suite, one configuration, behaviour chosen by the environment.
//
// Tip: while you work, keep `npm run dev` running in another terminal. The config reuses
// a server that is already listening on port 3000 instead of building again.

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
  ? [['html'], ['blob']]
  : [['html']],


  use: {
    baseURL: targetURL || 'http://localhost:3000',
    trace: 'on-first-retry',

    extraHTTPHeaders: targetURL && bypassSecret 
    ? { 
      'x-vercel-protection-bypass': bypassSecret,
      'x-vercel-set-bypass-cookie' : 'true'
    } : {},
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],

  webServer: targetURL ? undefined : {
    command: 'npm run build && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
