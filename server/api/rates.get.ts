// GET /api/rates  ->  { THB_per_USD }
//
// Stands in for a third-party exchange-rate service, and behaves like one: it is slow, and
// some of the time it is down. The failure rate comes from runtimeConfig.fxFailureRate
// (NUXT_FX_FAILURE_RATE), 0.35 by default — locally, in CI, and on Vercel alike.

export default defineEventHandler(async event => {
  setResponseHeader(event, 'Cache-Control', 'no-store');
  await new Promise(resolve => setTimeout(resolve, 250));

  const { fxFailureRate } = useRuntimeConfig(event);
  if (Math.random() < Number(fxFailureRate)) {
    throw createError({ statusCode: 503, statusMessage: 'rates service unavailable' });
  }
  return { THB_per_USD: 36.5 };
});
