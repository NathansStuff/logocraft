import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

export const SparkAction = z.object({
  userId: z.instanceof(ObjectId).nullable(),
  sparksUsed: z.number().optional().default(1), // Number of sparks used for the action
});

export type SparkAction = z.infer<typeof SparkAction>;
export type SparkActionWithId = WithId<SparkAction> & { _id: ObjectId; createdAt: Date; updatedAt: Date };
