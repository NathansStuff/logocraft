import { z } from 'zod';

export const ChangeSubscriptionRequest = z.object({
  stripeSubscriptionId: z.string(),
  newPriceId: z.string(),
  oldPriceId: z.string(),
});

export type ChangeSubscriptionRequest = z.infer<typeof ChangeSubscriptionRequest>;
