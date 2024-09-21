import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from 'stripe';

import { NEXT_PUBLIC_STRIPE_PUBLIC_KEY } from '@/constants';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createStripeCustomer = async (email: string, name: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return null;
  }
};

export async function getStripeCustomer(customerId: string | undefined, email: string) {
  let customer;
  if (customerId) {
    customer = await stripe.customers.retrieve(customerId);
  } else {
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length === 0) {
      customer = await stripe.customers.create({ email });
    } else {
      customer = existingCustomers.data[0];
    }
  }

  return customer;
}

export const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
