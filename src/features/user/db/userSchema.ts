import { Schema } from 'mongoose';

import { User } from '@/features/user/types/User';

export const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    stripeCustomerId: { type: String, required: false },
    stripeSubscriptionId: { type: String, required: false },
    activeSubscription: { type: Boolean, required: true, default: false },
    subscriptionCancelDate: { type: Date, required: false },
    subscriptionStartDate: { type: Date, required: false },
    currentPeriodEnd: { type: Date, required: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
    oneTimePurchases: { type: [String], required: true, default: [] },
    currentPlan: {
      type: {
        planName: { type: String, required: false },
        planAmount: { type: Number, required: false },
        currency: { type: String, required: false },
        billingInterval: { type: String, required: false },
        plan: { type: String, required: false },
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
