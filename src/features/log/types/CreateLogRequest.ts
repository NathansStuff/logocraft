import { z } from 'zod';

import { ELogType } from './ELogType';

// Define the Log schema
export const CreateLogRequest = z.object({
  userId: z.string(),
  action: z.nativeEnum(ELogType),
  details: z.string().optional(), // Any additional details or error messages
  additionalInfo: z.record(z.string(), z.any()).optional(), // For storing any extra data as key-value pairs
});

export type CreateLogRequest = z.infer<typeof CreateLogRequest>;
