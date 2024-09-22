import { loadStripe } from '@stripe/stripe-js';

import { env } from '@/constants';

export const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
