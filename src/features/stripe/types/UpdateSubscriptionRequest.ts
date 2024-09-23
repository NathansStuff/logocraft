import { z } from 'zod';

export const UpdateSubscriptionRequest = z.object({
  userId: z.string(),
  priceId: z.string(),
  subscriptionId: z.string(),
});

export type UpdateSubscriptionRequest = z.infer<typeof UpdateSubscriptionRequest>;
