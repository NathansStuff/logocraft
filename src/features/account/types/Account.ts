import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

export const Account = z.object({
  userId: z.instanceof(ObjectId),
  provider: z.string(),
  providerId: z.string(),
  email: z.string().email(),
  passwordHash: z.string().optional(),
  resetToken: z.string().optional().nullable(),
  resetTokenExpiry: z.date().optional().nullable(),
});

export const AccountPartial = Account.partial();

export type Account = z.infer<typeof Account>;
export type AccountWithId = WithId<Account> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type AccountPartial = z.infer<typeof AccountPartial>;
