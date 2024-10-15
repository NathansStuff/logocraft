import { CreatePurchaseRequest } from '../types/CreatePurchaseRequest';
import { CreatePurchaseResponse } from '../types/CreatePurchaseResponse';
import { BaseApiClient } from '@/lib/BaseApiClient';

export async function createPurchase(request: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
  const url = '/api/stripe/create-purchase';
  const response = await BaseApiClient.post<CreatePurchaseResponse>(url, request);
  return response.data;
}
