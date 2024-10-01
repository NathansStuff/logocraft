import { z } from 'zod';

export const CancelIncompleteSubscriptionRequest = z.object({
  stripeCustomerId: z.string(),
});

export type CancelIncompleteSubscriptionRequest = z.infer<typeof CancelIncompleteSubscriptionRequest>;
