import { Schema } from 'mongoose';

import { Log } from '@/features/log/types/Log';

export const logSchema = new Schema<Log>(
  {
    userId: { type: Schema.Types.ObjectId },
    action: { type: String, required: true },
    ipAddress: { type: String },
    status: { type: String, required: true },
    details: { type: String },
    additionalInfo: { type: Map },
  },
  { timestamps: true }
);
