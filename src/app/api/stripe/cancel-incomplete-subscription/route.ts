import { NextRequest, NextResponse } from 'next/server';

import { cancelIncompleteSubscriptionHandler } from '@/features/stripe/server/stripeController';
import { TryCatchMiddleware } from '@operation-firefly/error-handling';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => cancelIncompleteSubscriptionHandler(req));
}
