import { NextRequest, NextResponse } from 'next/server';

import { createSubscriptionHandler } from '@/features/stripe/server/stripeController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createSubscriptionHandler(req));
}
