import { z } from 'zod';

export const CreatePurchaseRequest = z.object({
  email: z.string().email({ message: 'Oops! Looks like that is not a valid email' }),
  priceId: z.string(),
  customerId: z.string().nullable(),
  userId: z.string(),
});

export type CreatePurchaseRequest = z.infer<typeof CreatePurchaseRequest>;
