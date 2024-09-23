import { z } from 'zod';

export const ReEnableSubscriptionRequest = z.object({
  userId: z.string(),
  customerId: z.string(),
});

export type ReEnableSubscriptionRequest = z.infer<typeof ReEnableSubscriptionRequest>;
