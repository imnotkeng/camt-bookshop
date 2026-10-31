// CAMT Bookshop — Nuxt 4, TypeScript.
//
// A client-rendered app (ssr: false) with two server routes under server/api/. Locally it
// runs as a Node server (`npm run build && npm start`); on Vercel the same build becomes
// static files plus serverless functions.

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  ssr: false,
  devtools: { enabled: false },
  css: ['~/assets/main.css'],

  app: {
    head: {
      title: 'CAMT Bookshop',
      htmlAttrs: { lang: 'en' },
    },
  },

  runtimeConfig: {
    // Fraction of GET /api/rates calls answered 503 — the unreliable third-party service.
    // Override with NUXT_FX_FAILURE_RATE.
    fxFailureRate: 0.35,

    public: {
      // The build stamp in the footer. A deploy job may set NUXT_PUBLIC_APP_VERSION to the
      // commit SHA, so a post-deploy check can prove which build is live.
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION ?? 'dev',
    },
  },
});
