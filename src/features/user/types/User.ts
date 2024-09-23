import { WithId } from 'mongodb';
import { z } from 'zod';

import { ETier } from './ETiers';
import { SubscriptionPlan } from './SubscriptionPlan';

export const User = z.object({
  name: z.string(),
  email: z.string().email(),
  imageUrl: z.string().url().optional(),
  stripeCustomerId: z.string().optional(),
  activeSubscription: z.boolean().default(false),
  accountTier: z.nativeEnum(ETier).optional(),
  subscriptionCancelDate: z.string().nullable().optional(),
  stripeSubscriptionId: z.string().optional(),
  isEmailVerified: z.boolean().default(false),
  oneTimePurchases: z.array(z.string()).default([]), // stripe productIds
  currentPlan: SubscriptionPlan.nullable(),
  sparksUsed: z.number().default(0),
  credits: z.object({
    sparks: z.number().default(0),
  }),
});

export const UserPartial = User.partial();

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export type UserPartial = z.infer<typeof UserPartial>;
