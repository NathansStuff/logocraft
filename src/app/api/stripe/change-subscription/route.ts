import { NextRequest, NextResponse } from 'next/server';

import { changeSubscriptionHandler } from '@/features/stripe/server/stripeController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => changeSubscriptionHandler(req));
}
