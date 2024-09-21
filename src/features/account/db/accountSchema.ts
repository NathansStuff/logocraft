import { Schema } from 'mongoose';

import { Account } from '@/features/account/types/Account';

export const accountSchema = new Schema<Account>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    passwordHash: { type: String, required: false },
    email: { type: String, required: true },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);
