import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

const planOrder = [
  ESubscriptionPlan.FREE,
  ESubscriptionPlan.STANDARD_MONTHLY,
  ESubscriptionPlan.STANDARD_ANNUAL,
  ESubscriptionPlan.PREMIUM_MONTHLY,
  ESubscriptionPlan.PREMIUM_ANNUAL,
];

export function isSubscriptionUpgrade(currentPlan: SubscriptionPlan, newPlan: SubscriptionPlan): boolean {
  if (currentPlan.plan === null || newPlan.plan === null) {
    console.error('Invalid plan type: null plan encountered');
    return false;
  }

  const currentPlanIndex = planOrder.indexOf(currentPlan.plan);
  const newPlanIndex = planOrder.indexOf(newPlan.plan);

  if (currentPlanIndex === -1 || newPlanIndex === -1) {
    console.error('Invalid plan type:', currentPlan.plan, newPlan.plan);
    return false;
  }

  return newPlanIndex > currentPlanIndex;
}
