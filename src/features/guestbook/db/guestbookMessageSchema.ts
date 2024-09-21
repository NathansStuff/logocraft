import { Schema } from 'mongoose';

import { GuestbookMessage } from '../types/GuestbookMessage';

export const guestbookMessageSchema = new Schema<GuestbookMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
);
