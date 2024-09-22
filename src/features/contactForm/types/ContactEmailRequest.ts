import * as z from 'zod';

export const ContactEmailRequest = z.object({
  name: z.string().min(1).max(50),
  subject: z.string().min(1).max(50),
  message: z.string().min(1).max(500),
  email: z.string().email(),
  userId: z.string().optional(),
});

export type ContactEmailRequest = z.infer<typeof ContactEmailRequest>;
