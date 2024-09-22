import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/serverStripe';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const customerId = request.url.split('?customerId=')[1];

  try {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ plan: null });
    }

    const subscription = subscriptions.data[0];
    const price = subscription.items.data[0].price;
    const plan = {
      name: price.nickname,
      amount: price.unit_amount,
      annual: price.recurring?.interval === 'year',
      priceId: price.id, // Adding priceId to the plan object
    };

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Error fetching current plan:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
