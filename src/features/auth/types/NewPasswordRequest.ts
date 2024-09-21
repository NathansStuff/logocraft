import * as z from 'zod';

import {
  lowercaseErrorMessage,
  maxLengthErrorMessage,
  minLengthErrorMessage,
  numberErrorMessage,
  specialCharacterErrorMessage,
  uppercaseErrorMessage,
} from '../data/passwordErrorMessages';

export const NewPasswordRequest = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Specify where the error message should appear
  });

export type NewPasswordRequest = z.infer<typeof NewPasswordRequest>;
