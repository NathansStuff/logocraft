import Stripe from 'stripe';

import { products } from '@/features/product/products';
import { updateUserByIdService } from '@/features/user/server/userService';
import { UserWithId } from '@/features/user/types/User';
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
  customerId: string | null,
  userId: string
): Promise<string> {
  // Find the product based on the priceId
  const product = products.find((p) => p.priceId === priceId);

  if (!product) {
    throw new Error('Product not found');
  }

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
      metadata: {
        productId: product.productId,
        userId: userId,
      },
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

export async function cancelSubscription(userId: string, customerId: string): Promise<UserWithId> {
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
  const updatedUser = await updateUserByIdService(userId, { subscriptionCancelDate: cancelAtString });

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
}

export async function cancelSubscriptionImmediately(userId: string, customerId: string): Promise<UserWithId> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    throw new Error('No subscription found');
  }

  const subscription = subscriptions.data[0];

  // Cancel the subscription immediately
  await stripe.subscriptions.cancel(subscription.id);

  // Update user in the database to clear the cancelation date
  const updatedUser = await updateUserByIdService(userId, { subscriptionCancelDate: null });

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
}

// todo: types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getCurrentPlanService(customerId: string): Promise<any> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return null;
  }

  const subscription = subscriptions.data[0];
  const price = subscription.items.data[0].price;
  const plan = {
    name: price.nickname,
    amount: price.unit_amount,
    annual: price.recurring?.interval === 'year',
    priceId: price.id, // Adding priceId to the plan object
  };

  return plan;
}

export async function getSubscruiptionIdService(customerId: string): Promise<string | null> {
  // Retrieve the list of subscriptions for the given customer
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    return null;
  }

  // Return the subscription ID
  const subscriptionId = subscriptions.data[0].id;

  return subscriptionId;
}

export async function reenableSubscriptionIdService(customerId: string, userId: string): Promise<UserWithId> {
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
  const updatedUser = await updateUserByIdService(userId, { subscriptionCancelDate: null });

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
}

export async function updateSubscriptionService(
  userId: string,
  priceId: string,
  subscriptionId: string
): Promise<UserWithId> {
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
  const updatedUser = await updateUserByIdService(userId, { stripeSubscriptionId: updatedSubscription.id });

  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  return updatedUser;
}
