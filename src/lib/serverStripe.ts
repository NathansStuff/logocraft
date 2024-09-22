import { Stripe } from 'stripe';

import { env } from '@/constants';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const createStripeCustomer = async (
  email: string,
  name: string
): Promise<Stripe.Response<Stripe.Customer> | null> => {
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
