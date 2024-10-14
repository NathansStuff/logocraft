import { NextRequest, NextResponse } from 'next/server';
import { handleStripeEventService, getStripeEvent } from '@/features/stripe/server/stripeService';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(async () => {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    const event = getStripeEvent(signature, body);
    await handleStripeEventService(event);

    return NextResponse.json({ received: true });
  });
}
