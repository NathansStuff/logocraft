import { ResponseCode } from '@operation-firefly/error-handling';

import { ReenableSubscriptionRequest } from '../types/ReenableSubscriptionRequest';
import { BaseApiClient } from '@/lib/BaseApiClient';

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
