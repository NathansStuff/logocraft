import { NextRequest, NextResponse } from 'next/server';

import { changeSubscriptionHandler } from '@/features/stripe/server/stripeController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => changeSubscriptionHandler(req));
}
