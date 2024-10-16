import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { SubscriptionPlan } from './SubscriptionPlan';

export const User = z.object({
  name: z.string(),
  email: z.string().email(),
  imageUrl: z.string().optional(),
  stripeCustomerId: z.string().optional(), // The Stripe customer ID
  stripeSubscriptionId: z.string().optional(), // The Stripe subscription ID
  activeSubscription: z.boolean().default(false), // Is the subscription active?
  subscriptionCancelDate: z.date().nullable().optional(), // If set to cancel at the end of the period
  subscriptionStartDate: z.date().optional(), // When the subscription started
  currentPeriodEnd: z.date().optional(), // When the current billing period ends
  currentPlan: SubscriptionPlan.nullable(), // Current subscription plan details
  pendingPlan: SubscriptionPlan.nullable().optional(), // Pending subscription plan details (for downgrades)
  isEmailVerified: z.boolean().default(false),
  oneTimePurchases: z.array(z.string()).default([]), // IDs of purchased products
  sparksUsed: z.number().default(0),
  credits: z.object({
    sparks: z.number().default(0),
  }),
  receiptUrls: z.array(z.string()).default([]).optional(),
});

export const UserPartial = User.partial();

export type User = z.infer<typeof User>;
export interface UserWithId extends User {
  _id: ObjectId;
}
export type UserPartial = z.infer<typeof UserPartial>;
