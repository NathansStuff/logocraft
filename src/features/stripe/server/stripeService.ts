import Stripe from 'stripe';

import { products } from '@/features/product/products';
import { stripe } from '@/lib/serverStripe';

// Get customer by email
export async function getStripeCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({
    email: email,
    limit: 1, // Assuming email is unique; adjust if needed
  });

  if (customers.data.length === 0) {
    return null;
  }

  return customers.data[0];
}

// Get Successful Charges for a customer
export async function getSuccessfulChargesForCustomer(customerId: string): Promise<Stripe.Charge[]> {
  const charges = await stripe.charges.list({
    customer: customerId,
    limit: 100, // Adjust the limit as needed
  });

  return charges.data.filter((charge) => charge.status === 'succeeded');
}

// Get all successful charges for a customer by email
export async function getSuccessfulChargesByEmail(email: string): Promise<Stripe.Charge[]> {
  const customer = await getStripeCustomerByEmail(email);
  if (!customer) {
    return [];
  }

  return getSuccessfulChargesForCustomer(customer.id);
}

// Retrieve or create a customer
export async function getOrCreateStripeCustomer(customerId: string | null, email: string): Promise<Stripe.Customer> {
  if (customerId) {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer) return customer as Stripe.Customer;
  }

  // If customerId is not provided or the customer does not exist, create a new customer
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
}

// Create a PaymentIntent for a one-time purchase
export async function createPaymentIntent(
  email: string,
  priceId: string,
  customerId: string | null,
  userId: string
): Promise<Stripe.PaymentIntent> {
  // Find the product based on the priceId
  const product = products.find((p) => p.priceId === priceId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Retrieve or create the customer
  const customer = await getOrCreateStripeCustomer(customerId, email);

  // Create the PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(product.amount),
    currency: 'usd',
    customer: customer.id,
    payment_method_types: ['card'],
    receipt_email: email,
    metadata: {
      productId: product.productId,
      userId: userId,
    },
  });

  return paymentIntent;
}

// Create a Subscription Intent
export async function createSubscriptionIntent(
  email: string,
  priceId: string,
  customerId: string | null
): Promise<string> {
  // Retrieve or create the customer
  const customer = await getOrCreateStripeCustomer(customerId, email);

  // List all subscriptions for the customer
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    limit: 1,
  });

  // Create or update the subscription
  let subscription: Stripe.Subscription;
  if (subscriptions.data.length === 0) {
    // Create a new subscription if none exist
    subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  } else {
    // Update the existing subscription with the new price
    const existingSubscription = subscriptions.data[0];
    const subscriptionItemId = existingSubscription.items.data[0].id;

    subscription = await stripe.subscriptions.update(existingSubscription.id, {
      items: [
        {
          id: subscriptionItemId,
          price: priceId,
        },
      ],
      expand: ['latest_invoice.payment_intent'],
    });
  }

  // Check if the latest_invoice is an object and has a payment_intent
  const latestInvoice = subscription.latest_invoice;

  if (latestInvoice && typeof latestInvoice !== 'string' && latestInvoice.payment_intent) {
    const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
    if (paymentIntent.client_secret) {
      return paymentIntent.client_secret;
    }
  }

  throw new Error('Failed to retrieve the payment intent client secret.');
}
