import { capitalizeString } from '@operation-firefly/capitalize-string';

import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { convertToSubcurrency } from '@/utils/convertToSubcurrency';

export function formatPlanInfo(plan: SubscriptionPlan | null): string {
  if (plan === null) return '';
  return `${plan.planName} - $${convertToSubcurrency(plan.planAmount)}/${capitalizeString(plan.billingInterval)} ${plan.currency.toLocaleUpperCase()}`;
}
