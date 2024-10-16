import { ResponseCode } from '@operation-firefly/error-handling';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { ReenableSubscriptionRequest } from '../types/ReenableSubscriptionRequest';

export async function reenableSubscription(request: ReenableSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/reenable-subscription';
    const response = await BaseApiClient.post(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('deleteSubscription', error);
    return false;
  }
}
