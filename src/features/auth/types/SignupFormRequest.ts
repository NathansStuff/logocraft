import * as z from 'zod';

import {
  lowercaseErrorMessage,
  maxLengthErrorMessage,
  minLengthErrorMessage,
  numberErrorMessage,
  specialCharacterErrorMessage,
  uppercaseErrorMessage,
} from '../data/passwordErrorMessages';

export const SignupFormRequest = z.object({
  email: z.string().email({
    message: 'Oops! Looks like that is not a valid email',
  }),
  password: z
    .string()
    .min(8, { message: minLengthErrorMessage })
    .max(20, { message: maxLengthErrorMessage })
    .refine((password) => /[A-Z]/.test(password), {
      message: uppercaseErrorMessage,
    })
    .refine((password) => /[a-z]/.test(password), {
      message: lowercaseErrorMessage,
    })
    .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: specialCharacterErrorMessage,
    }),
});
export type SignupFormRequest = z.infer<typeof SignupFormRequest>;
