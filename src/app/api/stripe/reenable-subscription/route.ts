import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { reenableSubscriptionHandler } from '@/features/stripe/server/stripeController';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => reenableSubscriptionHandler(req));
}
