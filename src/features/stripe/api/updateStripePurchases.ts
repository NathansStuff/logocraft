import { store } from '@/contexts/store';
import { setOneTimePurchases } from '@/contexts/userSlice';
import { updateUser } from '@/features/user/api/updateUser';

import { getPurchases } from './getPurchases';

export async function updateStripePurchases(email: string): Promise<void> {
  const purchases = await getPurchases(email);
  const newPurchases = purchases.map((purchase) => purchase.metadata.productId);

  const savedPurchases = store.getState().user.oneTimePurchases || [];

  // Combine saved purchases and new purchases, ensuring there are no duplicates
  const combinedPurchases = Array.from(
    new Set([...savedPurchases, ...newPurchases].filter((purchase) => purchase != null))
  );
  console.log('combinedPurchases', combinedPurchases);

  // Dispatch the combined list of productIds
  store.dispatch(setOneTimePurchases(combinedPurchases));

  // Update the user's purchases in the database
  await updateUser({ oneTimePurchases: combinedPurchases });
}
