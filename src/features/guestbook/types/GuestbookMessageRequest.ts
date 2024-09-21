import { z } from 'zod';

export const GuestbookMessageRequest = z.object({
  userId: z.string(),
  message: z.string(),
});

export type GuestbookMessageRequest = z.infer<typeof GuestbookMessageRequest>;
