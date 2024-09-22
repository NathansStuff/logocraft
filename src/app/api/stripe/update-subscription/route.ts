import { NextRequest, NextResponse } from 'next/server';

import { updateUserByIdService } from '@/features/user/server/userService';
import { stripe } from '@/lib/serverStripe';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { priceId, userId, subscriptionId } = await request.json();

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['items'] });
    const subscriptionItemId = subscription.items.data[0].id;

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscriptionItemId,
          price: priceId,
        },
      ],
    });

    // Update user in the database with the subscription ID
    await updateUserByIdService(userId, { stripeSubscriptionId: updatedSubscription.id });

    return NextResponse.json({ success: true, updatedSubscription });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
