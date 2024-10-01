import { z } from 'zod';

export const DeleteSubscriptionRequest = z.object({
  stripeSubscriptionId: z.string(),
});

export type DeleteSubscriptionRequest = z.infer<typeof DeleteSubscriptionRequest>;
