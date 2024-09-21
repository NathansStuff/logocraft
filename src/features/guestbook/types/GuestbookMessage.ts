import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

export const GuestbookMessage = z.object({
  userId: z.instanceof(ObjectId).nullable(),
  message: z.string(),
});

export const GuestbookMessagePartial = GuestbookMessage.partial();

export type GuestbookMessage = z.infer<typeof GuestbookMessage>;
export type GuestbookMessageWithId = WithId<GuestbookMessage> & { _id: ObjectId; createdAt: Date; updatedAt: Date };
export type GuestbookMessagePartial = z.infer<typeof GuestbookMessage>;
