import { NextRequest, NextResponse } from 'next/server';

import { getSubscriptionDetails } from '@/features/stripe/server/stripeService';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(async () => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }
    const subscription = await getSubscriptionDetails(id);
    return NextResponse.json(subscription);
  });
}
