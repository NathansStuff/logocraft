import { z } from 'zod';

export const LoginRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  imageUrl: z.string().url().optional().nullable(),
  provider: z.string(),
  providerId: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequest>;
