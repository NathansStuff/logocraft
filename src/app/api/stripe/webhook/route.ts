import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/constants';
import { stripe } from '@/lib/serverStripe';

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();

  const signature = headers().get('stripe-signature');

  let event;

  // verify Stripe event is legit
  try {
    if (!signature) {
      return NextResponse.json({ error: 'Stripe signature is missing' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Webhook signature verification failed. ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else {
      console.error(`Webhook signature verification failed. ${err}`);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
  }

  try {
    switch (event.type) {
      case 'payment_intent.created': {
        // ✅ Product ❌ Subscription
        // Logic for when a payment intent is created
        // Do nothing
        break;
      }
      case 'payment_intent.succeeded': {
        // ✅ Product ✅ Subscription
        // Logic for handling successful payments
        // Do nothing => (success is handled by `charge.succeeded` or `invoice.payment_succeeded`)
        break;
      }
      case 'payment_intent.payment_failed': {
        // ✅ Product ✅ Subscription
        // Logic for when the payment fails
        // Do nothing
        break;
      }
      case 'charge.succeeded': {
        // ✅ Product ✅ Subscription
        // Logic for successful charge
        console.log(event.data.object);
        const isSubscription = event.data.object.invoice !== null;
        if (isSubscription) break;
        const { userId, productId } = event.data.object.metadata;
        const receiptUrl = event.data.object.receipt_url;
        console.log(
          `Not a subscription, charge successful for user ${userId} for product ${productId}. Receipt: ${receiptUrl}`
        );
        //todo: Update DB
        break;
      }
      case 'charge.failed': {
        // ✅ Product ✅ Subscription
        // Logic for failed charge
        // Do nothing => Failure is handled by stripe dashboard settings
        break;
      }
      case 'charge.updated': {
        // ✅ Product ✅ Subscription
        // Logic for when a charge is updated
        // Generally used for dispute or payment method updates
        // You can log the update or notify the user of any critical charge changes
        // todo: Log this event
        break;
      }
      case 'payment_method.attached': {
        // ❌Product ✅ Subscription
        // Logic to handle when a payment method is attached to a customer
        // Do nothing
        break;
      }
      case 'customer.subscription.updated': {
        // ❌Product ✅ Subscription
        // Handle non-payment subscription updates, like plan changes or cancellations
        const subscription = event.data.object;
        console.log(`Subscription updated: ${subscription.id}, new status: ${subscription.status}`);
        // todo: Update DB if there are changes in plan, status, or similar
        break;
      }
      case 'invoice.updated': {
        // ❌Product ✅ Subscription
        // Logic to handle updates to invoices, such as new charges or adjustments.
        // Do nothing
        break;
      }
      case 'invoice.paid': {
        // ❌Product ✅ Subscription
        // Logic to handle fully paid invoices, such as activating or extending subscriptions.
        // Do nothing => Handled in `invoice.payment_succeeded`
        break;
      }
      case 'invoice.payment_succeeded': {
        // ❌Product ✅ Subscription
        // Logic for successful invoice payment, updating the subscription status accordingly.
        // This is the place to handle subscription payments and update user status
        const invoice = event.data.object;
        const { subscription, customer } = invoice;
        console.log(`Invoice paid successfully for subscription ${subscription}, customer: ${customer}`);
        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error(`stripe error: ${e} | EVENT TYPE: ${event.type}`);
  }

  return NextResponse.json({});
}
