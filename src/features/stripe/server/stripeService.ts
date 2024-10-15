import Stripe from 'stripe';

import { env } from '@/constants';
import { BadRequestError } from '@operation-firefly/error-handling';
import { products } from '@/features/product/products';
import { EProductType } from '@/features/product/types/EProductType';
import { Product } from '@/features/product/types/Product';
import { isSubscriptionUpgrade } from '@/features/product/utils/isSubscriptionUpgrade';
import {
  getUserByEmailService,
  getUserByIdService,
  getUserByStripeCustomerIdService,
  updateUserByIdService,
} from '@/features/user/server/userService';
import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { UserPartial } from '@/features/user/types/User';
import { stripe } from '@/lib/serverStripe';

import { subscriptionPlans } from '../data/subscriptionPlans';
import { mapBillingInterval } from '../utils/mapBillingInterval';

function mapProductToSubscriptionPlan(product: Product): SubscriptionPlan {
  return {
    planName: product.name,
    planAmount: parseInt(product.amount),
    currency: 'usd', // Assuming USD, adjust if needed
    billingInterval: product.paymentFrequency || EPaymentFrequency.MONTHLY, // Provide a default value
    plan: product.subscription || null, // Allow null
    priceId: product.priceId,
  };
}

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
): Promise<{ isDowngrade: boolean; effectiveDate: number }> {
  console.log('changeStripeSubscription started');
  console.log(`Old Price ID: ${oldPriceId}, New Price ID: ${newPriceId}`);

  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
  console.log('Current subscription:', JSON.stringify(subscription, null, 2));

  const oldProduct = products.find((p) => p.priceId === oldPriceId);
  const newProduct = products.find((p) => p.priceId === newPriceId);
  if (!oldProduct || !newProduct) {
    throw new BadRequestError('Product not found');
  }

  const oldPlan = mapProductToSubscriptionPlan(oldProduct);
  const newPlan = subscriptionPlans.find((plan) => plan.priceId === newPriceId);
  if (!newPlan) {
    throw new Error('New plan not found');
  }
  console.log('Old Plan:', oldPlan);
  console.log('New Plan:', newPlan);

  const isUpgrade = isSubscriptionUpgrade(oldPlan, newPlan);
  const isSameTier = oldPlan.planName === newPlan.planName;
  const isIntervalChange = oldPlan.billingInterval !== newPlan.billingInterval;
  console.log('Is Upgrade:', isUpgrade);
  console.log('Is Same Tier:', isSameTier);
  console.log('Is Interval Change:', isIntervalChange);

  let updatedSubscription;
  let effectiveDate: number;

  try {
    if (isUpgrade || (isSameTier && isIntervalChange)) {
      // Handle upgrade or interval change (treat as immediate change)
      updatedSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
        items: [{ id: subscription.items.data[0].id, price: newPriceId }],
        proration_behavior: 'create_prorations',
        billing_cycle_anchor: 'now',
        payment_behavior: 'pending_if_incomplete',
      });
      effectiveDate = Date.now();

      // Update user information in the database
      const user = await getUserByStripeCustomerIdService(subscription.customer as string);
      if (user) {
        await updateUserByIdService(user._id.toString(), {
          currentPlan: newPlan,
          currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
          pendingPlan: null,
        });
      }
    } else {
      // Handle downgrade using subscription schedules
      const currentPhaseEndDate = subscription.current_period_end;

      const schedule = await stripe.subscriptionSchedules.create({
        from_subscription: stripeSubscriptionId,
      });

      updatedSubscription = await stripe.subscriptionSchedules.update(schedule.id, {
        end_behavior: 'release',
        phases: [
          {
            start_date: schedule.phases[0].start_date,
            end_date: currentPhaseEndDate,
            items: [{ price: oldPriceId, quantity: 1 }],
          },
          {
            start_date: currentPhaseEndDate,
            items: [{ price: newPriceId, quantity: 1 }],
            iterations: 1,
          },
        ],
      });

      effectiveDate = currentPhaseEndDate * 1000; // Convert to milliseconds

      // Update user information in the database
      const user = await getUserByStripeCustomerIdService(subscription.customer as string);
      if (user) {
        await updateUserByIdService(user._id.toString(), {
          pendingPlan: newPlan,
          currentPeriodEnd: new Date(currentPhaseEndDate * 1000),
        });
      }
    }

    console.log('Effective Date:', new Date(effectiveDate).toISOString());

    return { isDowngrade: !isUpgrade, effectiveDate };
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw new BadRequestError('Failed to update subscription');
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
    case 'invoice.created':
      await handleInvoiceCreated(event.data.object as Stripe.Invoice);
      break;

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
    stripeSubscriptionId: subscriptionId,
    subscriptionCancelDate,
    currentPeriodEnd: new Date(periodEnd * 1000),
    currentPlan: {
      planName: product?.name,
      planAmount: items.data[0].plan.amount || 0,
      currency: items.data[0].plan.currency,
      billingInterval: mapBillingInterval(items.data[0].plan.interval),
      plan: product.subscription || null,
      priceId: product.priceId,
    },
    pendingPlan: null, // Clear the pending plan when the subscription is updated
  };

  // Check if this update is a downgrade taking effect
  const isDowngrade = subscription.items.data.some((item) => item.price.id !== user.currentPlan?.priceId);
  if (isDowngrade) {
    // Update the user's plan in the database
    updatedUser.currentPlan = {
      planName: product?.name,
      planAmount: items.data[0].plan.amount || 0,
      currency: items.data[0].plan.currency,
      billingInterval: mapBillingInterval(items.data[0].plan.interval),
      plan: product.subscription || null,
      priceId: product.priceId,
    };

    // You might want to send an email to the user here informing them that their downgrade has taken effect
  }

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

async function handleInvoiceCreated(invoice: Stripe.Invoice): Promise<void> {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

    if (subscription.metadata.downgrade_scheduled === 'true') {
      const newPriceId = subscription.metadata.new_price_id;

      if (newPriceId) {
        await stripe.subscriptions.update(subscription.id, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: newPriceId,
              quantity: 1,
            },
          ],
          proration_behavior: 'none',
          metadata: {
            downgrade_scheduled: 'false',
            new_price_id: '',
          },
        });

        console.log(`Downgrade applied for subscription ${subscription.id}`);
      }
    }
  }
}
