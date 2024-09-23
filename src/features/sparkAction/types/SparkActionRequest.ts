import { z } from 'zod';

export const SparkActionRequest = z.object({
  userId: z.string(),
  sparksUsed: z.number().optional().default(1), // Number of sparks used for the action
});

export type SparkActionRequest = z.infer<typeof SparkActionRequest>;
