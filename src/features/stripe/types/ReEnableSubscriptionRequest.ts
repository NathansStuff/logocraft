import { z } from 'zod';

export const ReenableSubscriptionRequest = z.object({
  stripeSubscriptionId: z.string(),
});

export type ReenableSubscriptionRequest = z.infer<typeof ReenableSubscriptionRequest>;
