import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { ELogStatus } from './ELogStatus';
import { ELogType } from './ELogType';

// Define the Log schema
export const Log = z.object({
  userId: z.instanceof(ObjectId).nullable(),
  action: z.nativeEnum(ELogType),
  ipAddress: z.string().nullable(),
  status: z.nativeEnum(ELogStatus),
  details: z.string().optional(), // Any additional details or error messages
  additionalInfo: z.record(z.string(), z.any()).optional(), // For storing any extra data as key-value pairs
});

// Partial Log schema for optional fields
export const LogPartial = Log.partial();

export type Log = z.infer<typeof Log>;
export type LogWithId = WithId<Log>;
export type LogPartial = z.infer<typeof LogPartial>;
