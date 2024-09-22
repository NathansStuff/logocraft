import { postRequest } from '@/lib/fetch';

import { CreatePurchaseRequest } from '../types/CreatePurchaseRequest';
import { CreatePurchaseResponse } from '../types/CreatePurchaseResponse';

export async function createPurchase(request: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
  const url = '/api/stripe/create-purchase';
  const response = await postRequest<CreatePurchaseResponse>(url, request);
  return response.data;
}
