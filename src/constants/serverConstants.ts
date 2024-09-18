import assert from 'assert';

// Assertions for private environment variables, only executed on the server

if (typeof window === 'undefined') {
  // Check if running on the server
  assert.ok(process.env.SENDGRID_API_KEY, 'SENDGRID_API_KEY is not defined');
  assert.ok(process.env.SENDGRID_EMAIL, 'SENDGRID_EMAIL is not defined');
  assert.ok(process.env.GMAIL_EMAIL, 'GMAIL_EMAIL is not defined');
  assert.ok(process.env.GMAIL_PASS, 'GMAIL_PASS is not defined');
  assert.ok(process.env.REDIS_HOST, 'GMAIL_PASS is not defined');
  assert.ok(process.env.REDIS_PORT, 'GMAIL_PASS is not defined');
}

export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? '';
export const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL ?? '';
export const GMAIL_EMAIL = process.env.GMAIL_EMAIL ?? '';
export const GMAIL_PASS = process.env.GMAIL_PASS ?? '';
export const REDIS_HOST = process.env.GMAIL_PASS ?? '';
export const REDIS_PORT = process.env.GMAIL_PASS ?? '';
