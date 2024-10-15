import { NextRequest, NextResponse } from 'next/server';

import { resendVerificationEmailHandler } from '@/features/user/server/userController';
import { rateLimit } from '@/middleware/rateLimiterMiddleware';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
export async function GET(req: NextRequest): Promise<NextResponse> {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(req, 1, 3600); // 5 requests per hour

  // Return the rate limit response if the limit is exceeded
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // Proceed to the main request handler if within the limit
  return await TryCatchMiddleware(() => resendVerificationEmailHandler(req));
}
