import { Schema } from 'mongoose';

import { User } from '@/features/user/types/User';

export const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    stripeCustomerId: { type: String, required: false },
    activeSubscription: { type: Boolean, required: true, default: false },
    accountTier: { type: String, required: false },
    subscriptionCancelDate: { type: String, required: false },
    stripeSubscriptionId: { type: String, required: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
    oneTimePurchases: { type: [String], required: true, default: [] },
    currentPlan: {
      type: {
        name: { type: String, required: true },
        annual: { type: Boolean, required: true },
        amount: { type: String, required: true },
        priceId: { type: String, required: true },
        plan: { type: String, required: true },
      },
      required: false,
      nullable: true,
    },
    sparksUsed: { type: Number, required: true, default: 0 },
    credits: {
      type: {
        sparks: { type: Number, required: true, default: 0 },
      },
      required: true,
      _id: false,
    },
    receiptUrls: { type: [String], required: true, default: [] },
  },
  { timestamps: true }
);
