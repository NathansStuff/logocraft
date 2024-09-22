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
    const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    // Convert cancel_at to a string
    const cancelAtString = updatedSubscription.cancel_at ? updatedSubscription.cancel_at.toString() : null;

    // Update user in the database with the cancelation date
    await updateUserByIdService(userId, { subscriptionCancelDate: cancelAtString });

    return NextResponse.json({ success: true, cancelDate: updatedSubscription.cancel_at });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
