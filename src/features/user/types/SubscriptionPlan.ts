import { z } from 'zod';

import { EPaymentFrequency } from './EPaymentFrequency';
import { ESubscriptionPlan } from './ESubscriptionPlan';

export const SubscriptionPlan = z.object({
  planName: z.string(), // Human-readable plan name
  planAmount: z.number(), // Price in cents, like 1000 for $10.00
  currency: z.string(), // Currency code, e.g., USD
  billingInterval: z.nativeEnum(EPaymentFrequency), // Billing frequency
  plan: z.nativeEnum(ESubscriptionPlan).nullable(), // Enum representing the plan type
  priceId: z.string(),
});

export type SubscriptionPlan = z.infer<typeof SubscriptionPlan>;
