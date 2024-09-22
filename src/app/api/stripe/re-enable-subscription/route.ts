import { NextRequest, NextResponse } from 'next/server';

import { updateUserByIdService } from '@/features/user/server/userService';
import { stripe } from '@/lib/serverStripe';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { customerId, userId } = await request.json();

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      throw new Error('No subscription found');
    }

    const subscription = subscriptions.data[0];
    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
    });

    // Update user in the database to remove the cancelation date
    await updateUserByIdService(userId, { subscriptionCancelDate: null });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error re-enabling subscription:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
