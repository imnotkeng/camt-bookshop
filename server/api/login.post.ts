import { createHash } from 'node:crypto';

// POST /api/login  { email, password }  ->  200 { email }  |  401
export default defineEventHandler(async event => {
  const body = await readBody<{ email?: string; password?: string }>(event);
  const email = String(body?.email ?? '').trim().toLowerCase();
  const hash = createHash('sha256').update(String(body?.password ?? '')).digest('hex');

  if (email !== DEMO_ACCOUNT.email || hash !== DEMO_ACCOUNT.passwordSha256) {
    throw createError({ statusCode: 401, statusMessage: 'Incorrect email or password.' });
  }
  return { email };
});
