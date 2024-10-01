// services/stripeService.ts

import { postRequest } from '@/lib/fetch';
import { ResponseCode } from '@/types/ResponseCode';

import { ChangeSubscriptionRequest } from '../types/ChangeSubscriptionRequest';

export async function changeSubscription(request: ChangeSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/change-subscription';
    const response = await postRequest(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('changeSubscription', error);
    return false;
  }
}
