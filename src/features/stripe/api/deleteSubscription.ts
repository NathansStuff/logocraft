import { ResponseCode } from '@operation-firefly/error-handling';

import { DeleteSubscriptionRequest } from '../types/DeleteSubscriptionRequest';
import { BaseApiClient } from '@/lib/BaseApiClient';

export async function deleteSubscription(request: DeleteSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/delete-subscription';
    const response = await BaseApiClient.post(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('deleteSubscription', error);
    return false;
  }
}
