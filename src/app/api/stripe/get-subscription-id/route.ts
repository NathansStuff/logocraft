import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/serverStripe';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { customerId } = await request.json();

  try {
    // Retrieve the list of subscriptions for the given customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ subscriptionId: null }, { status: 404 });
    }

    // Return the subscription ID
    const subscriptionId = subscriptions.data[0].id;
    return NextResponse.json({ subscriptionId }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
