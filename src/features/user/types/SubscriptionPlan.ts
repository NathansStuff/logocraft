import { z } from 'zod';
import { ESubscriptionPlan } from './ESubscriptionPlan';

export const SubscriptionPlan = z.object({
  name: z.string(),
  annual: z.boolean(),
  amount: z.string(),
  priceId: z.string(),
  plan: z.nativeEnum(ESubscriptionPlan),
});

export type SubscriptionPlan = z.infer<typeof SubscriptionPlan>;
