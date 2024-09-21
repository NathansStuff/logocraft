import * as z from 'zod';

export const LoginFormRequest = z.object({
  email: z.string().email({
    message: 'Oops! Looks like that is not a valid email',
  }),
  password: z.string().min(3),
});
export type LoginFormRequest = z.infer<typeof LoginFormRequest>;
