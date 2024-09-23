import { Schema } from 'mongoose';

import { SparkAction } from '../types/SparkMeter';

export const sparkActionSchema = new Schema<SparkAction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sparksUsed: { type: Number, default: 1 },
  },
  { timestamps: true }
);
