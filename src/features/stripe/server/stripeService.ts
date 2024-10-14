import Stripe from 'stripe';

import { env } from '@/constants';
import { BadRequestError } from '@/exceptions';
import { products } from '@/features/product/products';
import { EProductType } from '@/features/product/types/EProductType';
import { isSubscriptionUpgrade } from '@/features/product/utils/isSubscriptionUpgrade';
import {
  getUserByEmailService,
  getUserByIdService,
  getUserByStripeCustomerIdService,
  updateUserByIdService,
} from '@/features/user/server/userService';
import { UserPartial } from '@/features/user/types/User';
import { stripe } from '@/lib/serverStripe';

import { mapBillingInterval } from '../utils/mapBillingInterval';

// Retrieve or create a customer
async function getOrCreateStripeCustomer(customerId: string | null, email: string): Promise<Stripe.Customer> {
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

// Delete a subscription
export async function cancelStripeSubscription(stripeSubscriptionId: string): Promise<void> {
  await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true, // This cancels the subscription at the end of the current period
  });
}

// Delete a subscription
export async function reenableStripeSubscription(stripeSubscriptionId: string): Promise<void> {
  await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: false, // This cancels the subscription at the end of the current period
  });
}

// Change a subscription
export async function changeStripeSubscription(
  stripeSubscriptionId: string,
  newPriceId: string,
  oldPriceId: string
): Promise<void> {
  console.log('changeStripeSubscription');
  // Fetch the current subscription to get the subscription item ID
  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
  const oldProduct = products.find((p) => p.priceId === oldPriceId);
  const newProduct = products.find((p) => p.priceId === newPriceId);
  if (!oldProduct || !newProduct) {
    throw new BadRequestError('Product not found');
  }

  // Determine if it's an upgrade
  const isUpgrade = isSubscriptionUpgrade(oldProduct, newProduct);

  // Check if the billing interval is changing
  const isIntervalChange = oldProduct.paymentFrequency !== newProduct.paymentFrequency;

  let updatedSubscription;

  if (isIntervalChange) {
    // If changing billing interval, create a new subscription
    updatedSubscription = await stripe.subscriptions.create({
      customer: subscription.customer as string,
      items: [{ price: newPriceId }],
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
      expand: ['latest_invoice'],
    });

    // Cancel the old subscription at the end of its current period
    await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    });
  } else {
    // If not changing billing interval, update the existing subscription
    updatedSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: 'always_invoice',
      payment_behavior: isUpgrade ? 'pending_if_incomplete' : 'default_incomplete',
      expand: ['latest_invoice'],
    });
  }

  // Get the invoice URL
  if (updatedSubscription.latest_invoice && typeof updatedSubscription.latest_invoice !== 'string') {
    const invoiceUrl = updatedSubscription.latest_invoice.invoice_pdf;
    console.log('Invoice URL:', invoiceUrl);
    // You can now store this invoiceUrl or send it to the customer
  }

  // If it's an upgrade, immediately collect payment for the prorated amount
  if (isUpgrade && updatedSubscription.latest_invoice && typeof updatedSubscription.latest_invoice !== 'string') {
    try {
      const invoice = updatedSubscription.latest_invoice;
      if (invoice.status !== 'paid') {
        await stripe.invoices.pay(invoice.id);
      } else {
        console.log('Invoice is already paid, no action needed');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error paying invoice:', error.message);
      } else {
        console.error('Unknown error paying invoice');
      }
      // Handle the error appropriately (e.g., notify the user, log it, etc.)
    }
  }
}

// Cancel Incomplete subscription
export async function cancelIncompleteSubscription(stripeCustomerId: string): Promise<void> {
  const subscriptions = await stripe.subscriptions.list({ customer: stripeCustomerId });
  // Filter for incomplete subscriptions
  const incompleteSubscription = subscriptions.data.find((sub) => sub.status === 'incomplete');

  if (incompleteSubscription) {
    // Cancel the incomplete subscription
    await stripe.subscriptions.cancel(incompleteSubscription.id);
  }
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
      payment_settings: { save_default_payment_method: 'on_subscription' },
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

export function getStripeEvent(signature: string | null, body: string): Stripe.Event {
  if (!signature) {
    throw new BadRequestError('Stripe signature is missing');
  }

  try {
    return stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    if (err instanceof Error) {
      throw new BadRequestError(`Webhook signature verification failed. ${err.message}`);
    } else {
      throw new BadRequestError('Webhook signature verification failed');
    }
  }
}

export async function handleStripeEventService(event: Stripe.Event): Promise<void> {
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
      const isSubscription = event.data.object.invoice !== null;
      if (isSubscription) break;
      const { userId, productId } = event.data.object.metadata;
      const receiptUrl = event.data.object.receipt_url;
      await handleProductPurchase(userId, productId, receiptUrl);
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
      handleSubscriptionUpdated(subscription);
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
      handleInvoicePaymentSucceeded(invoice);
      console.log('invoice.payment_succeeded');
      break;
    }

    default:
    // Unhandled event type
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  // Extract relevant fields from the subscription object
  const {
    id: subscriptionId,
    status: newStatus,
    customer: customerId, // Stripe customer ID
    cancel_at_period_end: willCancelAtPeriodEnd,
    current_period_end: periodEnd,
    items,
  } = subscription;
  if (typeof customerId !== 'string') {
    // todo: Log
    throw new BadRequestError('Customer ID not found');
  }

  // 1. Retrieve the user by stripe customer ID
  const user = await getUserByStripeCustomerIdService(customerId);
  if (!user) {
    // todo: Log
    throw new BadRequestError('User not found');
  }

  // 2. Map the subscription status to the user's account status
  let activeSubscription = false;
  let subscriptionCancelDate: Date | null = null;

  switch (newStatus) {
    case 'active':
      activeSubscription = true;
      break;
    case 'canceled':
    case 'unpaid':
    case 'incomplete':
    case 'past_due':
      activeSubscription = false;
      break;
  }

  if (willCancelAtPeriodEnd) {
    // Subscription is set to cancel at the end of the current period
    subscriptionCancelDate = new Date(periodEnd * 1000); // Convert Unix timestamp to ISO string
  }

  // 3. Update the user's account status in the database
  const subscriptionItem = items.data[0]; // Assuming there is only one item in the subscription
  const product = products.find((p) => p.priceId === subscriptionItem.price.id);
  if (!product) {
    // todo: Log
    throw new BadRequestError('Product not found');
  }

  const updatedUser: UserPartial = {
    activeSubscription,
    stripeSubscriptionId: subscriptionId, // Store Stripe subscription ID
    subscriptionCancelDate, // Store the cancel date if applicable
    currentPeriodEnd: new Date(periodEnd * 1000), // Store the end date of the current billing period
    currentPlan: {
      planName: product?.name, // Store the plan name
      planAmount: items.data[0].plan.amount || 0, // Store the plan amount in centss
      currency: items.data[0].plan.currency, // Store the currency, e.g., 'USD'
      billingInterval: mapBillingInterval(items.data[0].plan.interval),
      plan: product.subscription || null, // Store the plan type
      priceId: product.priceId,
    },
  };

  await updateUserByIdService(user._id.toString(), updatedUser);

  // 4. Emails
  // todo
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  const { subscription, customer_email } = invoice;
  const invoiceUrl = invoice.invoice_pdf;

  console.log('Invoice URL:', invoiceUrl);

  if (!subscription || !customer_email) {
    console.log('subscription', subscription, 'customer_email', customer_email);
    throw new BadRequestError('Subscription or customer email not found');
  }

  const user = await getUserByEmailService(customer_email);
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (!invoiceUrl) {
    console.log('no invoice Url');
    return;
  }
  const newUser: UserPartial = {
    // Update invoiceUrls instead of receiptUrls
    receiptUrls: [...(user.receiptUrls || []), invoiceUrl],
  };

  // Always update the user
  await updateUserByIdService(user._id.toString(), newUser);

  // Log the subscription update
  console.log(`Subscription ${subscription} updated for user ${user._id}`);
}

async function handleProductPurchase(userId: string, productId: string, receiptUrl: string | null): Promise<void> {
  const user = await getUserByIdService(userId);
  // Identify if new purchase includes tokens
  const product = products.find((prod) => prod.productId === productId);
  if (!user || !product) {
    // todo: Log
    console.log('User or product not found', { userId, productId });
    throw new BadRequestError('User or product not found');
  }
  const tokenAmount = product.tokens || 0;
  const currentTokens = user.credits.sparks;
  const newTokens = currentTokens + tokenAmount;
  const wasOneTimePurchase = product.type === EProductType.ONE_TIME_PURCHASE;
  const oneTimePurchases = user.oneTimePurchases || [];
  if (wasOneTimePurchase) {
    oneTimePurchases.push(productId);
  }

  const newUser: UserPartial = {
    oneTimePurchases,
    receiptUrls: receiptUrl ? [...(user.receiptUrls || []), receiptUrl] : user.receiptUrls,
    credits: {
      sparks: newTokens,
    },
  };
  await updateUserByIdService(userId, newUser);
}

export async function getSubscriptionDetails(subscriptionId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}