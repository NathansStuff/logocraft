import Stripe from 'stripe';

import { GetPurchasesRequest } from '@/features/product/data/GetPurchasesRequest';
import { postRequest } from '@/lib/fetch';

export async function getPurchases(email: string): Promise<Stripe.Charge[]> {
  const url = '/api/stripe/get-purchases';
  const body: GetPurchasesRequest = { email };
  const response = await postRequest<Stripe.Charge[]>(url, body);
  return response.data;
}
