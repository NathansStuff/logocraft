import { fileURLToPath } from 'node:url';

import createJiti from 'jiti';
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/constants/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: { domains: ['lh3.googleusercontent.com'] },
};

export default nextConfig;
