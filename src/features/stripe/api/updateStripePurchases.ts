import { store } from '@/contexts/store';
import { setNewTokens, setOneTimePurchases } from '@/contexts/userSlice';
import { updateUser } from '@/features/user/api/updateUser';

import { products } from '@/features/product/products';
import { getPurchases } from './getPurchases';

export async function updateStripePurchases(email: string): Promise<void> {
  const purchases = await getPurchases(email);
  const newPurchases = purchases.map((purchase) => purchase.metadata.productId);

  const savedPurchases = store.getState().user.oneTimePurchases || [];

  // Combine saved purchases and new purchases, ensuring there are no duplicates
  const combinedPurchases = Array.from(
    new Set([...savedPurchases, ...newPurchases].filter((purchase) => purchase != null))
  );

  // Identify if new purchase includes tokens
  const purchasesData = products.filter((product) => newPurchases.includes(product.productId));
  const tokenPurchases = purchasesData.filter((product) => product.tokens);
  const tokenAmount = tokenPurchases.reduce((acc, product) => acc + (product?.tokens ?? 0), 0);

  // Dispatch the combined list of productIds
  store.dispatch(setOneTimePurchases(combinedPurchases));

  if (tokenAmount) {
    store.dispatch(setNewTokens(tokenAmount));
  }

  // Update the user's purchases in the database
  await updateUser({ oneTimePurchases: combinedPurchases, credits: { sparks: tokenAmount } });
}
