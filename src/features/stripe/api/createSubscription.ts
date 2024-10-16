import { BaseApiClient } from '@/lib/BaseApiClient';

import { CreateSubscriptionRequest } from '../types/CreateSubscriptionRequest';
import { CreateSubscriptionResponse } from '../types/CreateSubscriptionResponse';

export async function createSubscription(request: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse> {
  const url = '/api/stripe/create-subscription';
  const response = await BaseApiClient.post<CreateSubscriptionResponse>(url, request);
  return response.data;
}
