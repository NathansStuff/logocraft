import { z } from 'zod';

export const GetSubscriptionIdRequest = z.object({
  customerId: z.string(),
});

export type GetSubscriptionIdRequest = z.infer<typeof GetSubscriptionIdRequest>;
