import assert from 'assert';

// Assertions for public environment variables, safe for client-side use
assert.ok(process.env.NEXT_PUBLIC_ENVIRONMENT, 'NEXT_PUBLIC_ENVIRONMENT is not defined');
assert.ok(process.env.NEXT_PUBLIC_BASE_URL, 'NEXT_PUBLIC_BASE_URL is not defined');
assert.ok(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, 'NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');

export const NEXT_PUBLIC_ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const NEXT_PUBLIC_STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
