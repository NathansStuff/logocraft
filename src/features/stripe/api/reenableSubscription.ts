// services/stripeService.ts

import { postRequest } from '@/lib/fetch';
import { ResponseCode } from '@operation-firefly/error-handling';

import { ReenableSubscriptionRequest } from '../types/ReenableSubscriptionRequest';

export async function reenableSubscription(request: ReenableSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/reenable-subscription';
    const response = await postRequest(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('deleteSubscription', error);
    return false;
  }
}
