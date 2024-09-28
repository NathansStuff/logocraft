import { store } from '@/contexts/store';
import { setNewTokens, setOneTimePurchases } from '@/contexts/userSlice';
import { products } from '@/features/product/products';
import { updateUser } from '@/features/user/api/updateUser';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

import { getPurchases } from './getPurchases';

export async function updateStripePurchases(email: string): Promise<void> {
  // todo: Identify if one time purchases need to be dispatched & refactor
  const purchases = await getPurchases(email);
  const newPurchases = purchases.map((purchase) => purchase.metadata.productId);

  const savedPurchases = store.getState().user.oneTimePurchases || [];

  // Combine saved purchases and new purchases, ensuring there are no duplicates
  const combinedPurchases = Array.from(
    new Set([...savedPurchases, ...newPurchases].filter((purchase) => purchase != null))
  );
  // Dispatch the combined list of productIds
  store.dispatch(setOneTimePurchases(combinedPurchases));

  // Identify if new purchase includes tokens
  const purchasesData = products.filter((product) => newPurchases.includes(product.productId));
  const tokenPurchases = purchasesData.filter((product) => product.tokens);
  const tokenAmount = tokenPurchases.reduce((acc, product) => acc + (product?.tokens ?? 0), 0);

  if (tokenAmount) {
    store.dispatch(setNewTokens(tokenAmount));
  }

  // Identify if the new purchase includes a subscription
  // ? Failing cause purchases is not subscriptions.
  console.log('purchasesData', purchasesData);
  const subscriptionPurchases = purchasesData.filter((product) => product.subscription);
  console.log('subscriptionPurchases', subscriptionPurchases);
  const purchase = subscriptionPurchases[0];
  let currentPlan: SubscriptionPlan | null = null;
  if (purchase && purchase.subscription) {
    currentPlan = {
      name: purchase.name,
      annual: false,
      amount: purchase.amount,
      priceId: purchase.priceId,
      plan: purchase.subscription,
    };
  }

  // Update the user's purchases in the database
  await updateUser({
    oneTimePurchases: combinedPurchases,
    credits: { sparks: tokenAmount },
    currentPlan,
  });
}
