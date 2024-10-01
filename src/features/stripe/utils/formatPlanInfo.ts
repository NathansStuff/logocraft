import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { capitalize } from '@/utils/capitalize';
import { convertToSubcurrency } from '@/utils/convertToSubcurrency';

export function formatPlanInfo(plan: SubscriptionPlan): string {
  return `${plan.planName} - $${convertToSubcurrency(plan.planAmount)}/${capitalize(plan.billingInterval)} ${plan.currency.toLocaleUpperCase()}`;
}
