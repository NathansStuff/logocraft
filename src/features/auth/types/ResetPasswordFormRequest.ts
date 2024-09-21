import * as z from 'zod';

export const ResetPasswordFormRequest = z.object({
  email: z.string().email({
    message: 'Oops! Looks like that is not a valid email',
  }),
});
export type ResetPasswordFormRequest = z.infer<typeof ResetPasswordFormRequest>;
