import { updateStripePurchases } from './updateStripePurchases';

export async function updateStripeCustomer(email: string): Promise<void> {
  await updateStripePurchases(email);
}
