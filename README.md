# CAMT Bookshop

A small bookshop built with **Nuxt 4** (Vue 3, TypeScript) and its Playwright suite — the
starter repository for Week 13 Lab 2 (495 Automated Test). Needs **Node 22.19+ or 24**.

```bash
npm ci
npx playwright install        # once per machine
npm run dev                   # http://localhost:3000 — to explore by hand
npx playwright test           # builds and starts the app itself, then 3 browsers
npm run test:smoke            # the @smoke set on Chromium
npm run typecheck             # vue-tsc over the whole app
```

While `npm run dev` is running, `npx playwright test` reuses it instead of building again.

The demo account's credentials are on your lab sheet. They do not belong in this repository.

## Application

| Path | What |
|---|---|
| `app/pages/` | `signin`, `books`, `cart`, `order/[ref]` — `/` redirects to `/books` |
| `app/composables/` | session, cart and orders, kept in `sessionStorage` (every browser context starts empty) |
| `app/utils/catalogue.ts` | the six books, the discount rule, money formatting |
| `server/api/login.post.ts` | `POST /api/login` — checks the demo account (only a SHA-256 of the password is stored) |
| `server/api/rates.get.ts` | `GET /api/rates` — a stand-in for a third-party exchange-rate service |

The app is client-rendered (`ssr: false`). Locally it runs as a Node server
(`npm run build && npm start`); on Vercel the same build becomes static files plus two
serverless functions.

| Rule | Value |
|---|---|
| Member discount | 10 % off when the subtotal is **2,000.00 THB or more** |
| USD conversion | `GET /api/rates`; fails with `503` on 35 % of calls, everywhere |

## Environment knobs

| Variable | Default | Effect |
|---|---|---|
| `PORT` | `3000` | port for `npm start` |
| `NUXT_FX_FAILURE_RATE` | `0.35` | fraction of `/api/rates` calls answered `503 Service Unavailable` |
| `NUXT_PUBLIC_APP_VERSION` | `dev` | the build stamp in the footer; set it at build time |

## Files

| Path | What |
|---|---|
| `app/`, `server/` | the application |
| `tests/` | the suite: `auth`, `catalogue`, `cart`, `checkout`, `fx` |
| `patches/` | a teammate's pull request, for Task 6 of the lab |
| `playwright.config.ts` | local-only starter configuration |
