import * as z from 'zod';

export const ValidateTokenRequest = z.object({
  token: z.string(),
});
export type ValidateTokenRequest = z.infer<typeof ValidateTokenRequest>;
