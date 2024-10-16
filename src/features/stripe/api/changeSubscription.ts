import { BaseApiClient } from '@/lib/BaseApiClient';

import { ChangeSubscriptionRequest } from '../types/ChangeSubscriptionRequest';

export async function changeSubscription(
  request: ChangeSubscriptionRequest
): Promise<{ isDowngrade: boolean; effectiveDate: number }> {
  try {
    const url = '/api/stripe/change-subscription';
    const response = await BaseApiClient.post<{ isDowngrade: boolean; effectiveDate: number }>(url, request);
    return response.data;
  } catch (error) {
    console.error('changeSubscription', error);
    throw error;
  }
}
