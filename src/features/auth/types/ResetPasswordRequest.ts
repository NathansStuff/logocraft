import * as z from 'zod';

export const ResetPasswordRequest = z.object({
  token: z.string(),
  password: z.string().min(3),
});
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequest>;
