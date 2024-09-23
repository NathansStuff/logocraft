import { z } from 'zod';

export const CancelSubscriptionRequest = z.object({
  priceId: z.string(),
  customerId: z.string(),
});

export type CancelSubscriptionRequest = z.infer<typeof CancelSubscriptionRequest>;
