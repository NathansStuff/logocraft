import { NextRequest, NextResponse } from 'next/server';

import { resetPasswordRequestHandler } from '@/features/account/server/accountController';
import { rateLimit } from '@/middleware/rateLimiterMiddleware';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(req, 1, 3600); // 5 requests per hour

  // Return the rate limit response if the limit is exceeded
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // Proceed to the main request handler if within the limit
  return await TryCatchMiddleware(() => resetPasswordRequestHandler(req));
}
