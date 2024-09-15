import { Log } from '@/features/log/types/Log';
import { Schema } from 'mongoose';

export const logSchema = new Schema<Log>(
  {
    message: { type: String, required: true },
    state: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);
