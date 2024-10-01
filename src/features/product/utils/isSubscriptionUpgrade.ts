import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';

import { Product } from '../types/Product';

const subscriptionOrder = [
  ESubscriptionPlan.FREE,
  ESubscriptionPlan.STANDARD_MONTHLY,
  ESubscriptionPlan.STANDARD_ANNUAL,
  ESubscriptionPlan.PREMIUM_MONTHLY,
  ESubscriptionPlan.PREMIUM_ANNUAL,
];

export function isSubscriptionUpgrade(currentPlan: Product, newPlan: Product): boolean {
  // If the new plan is a subscription and the current one is not, it's an upgrade
  if (!currentPlan.subscription && newPlan.subscription) {
    return true;
  }

  // If both are subscription plans, compare their levels
  if (currentPlan.subscription && newPlan.subscription) {
    const currentPlanIndex = subscriptionOrder.indexOf(currentPlan.subscription);
    const newPlanIndex = subscriptionOrder.indexOf(newPlan.subscription);

    if (newPlanIndex > currentPlanIndex) {
      return true;
    }
  }

  // Optionally, compare other fields like token count or other criteria
  if ((newPlan.tokens ?? 0) > (currentPlan.tokens ?? 0)) {
    return true;
  }

  // No upgrade found
  return false;
}
