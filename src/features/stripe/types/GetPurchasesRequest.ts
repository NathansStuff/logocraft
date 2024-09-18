import * as z from 'zod';

export const GetPurchasesRequest = z.object({
  email: z.string().email({
    message: 'Oops! Looks like that is not a valid email',
  }),
});
export type GetPurchasesRequest = z.infer<typeof GetPurchasesRequest>;
