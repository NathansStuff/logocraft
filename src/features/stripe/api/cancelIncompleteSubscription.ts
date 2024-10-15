// services/stripeService.ts

import { postRequest } from '@/lib/fetch';
import { ResponseCode } from '@operation-firefly/error-handling';

import { CancelIncompleteSubscriptionRequest } from '../types/CancelIncompleteSubscriptionRequest';

export async function cancelIncompleteSubscription(request: CancelIncompleteSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/cancel-incomplete-subscription';
    const response = await postRequest(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('changeSubscription', error);
    return false;
  }
}
