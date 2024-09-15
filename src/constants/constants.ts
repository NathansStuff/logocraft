import assert from 'assert';

assert.ok(
  process.env.NEXT_PUBLIC_ENVIRONMENT,
  'NEXT_PUBLIC_ENVIRONMENT is not defined'
);
export const NEXT_PUBLIC_ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

assert.ok(
  process.env.NEXT_PUBLIC_BASE_URL,
  'NEXT_PUBLIC_BASE_URL is not defined'
);
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ANNOUNCEMENT_EXPIRY_PERIOD = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in milliseconds
