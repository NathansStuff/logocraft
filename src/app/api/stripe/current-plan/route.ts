import { NextRequest, NextResponse } from 'next/server';

import { getCurrentPlanHandler } from '@/features/stripe/server/stripeController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getCurrentPlanHandler(req));
}
