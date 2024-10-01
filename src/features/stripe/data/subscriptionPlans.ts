import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';
import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    planName: 'Standard',
    planAmount: 500,
    currency: 'AUD',
    billingInterval: EPaymentFrequency.MONTHLY,
    priceId: 'price_1PhUQ9Jt0BdRfTXvlnTQRKWN',
    plan: ESubscriptionPlan.STANDARD_MONTHLY,
  },
  {
    planName: 'Standard',
    planAmount: 5000,
    currency: 'AUD',
    priceId: 'price_1PhUQ9Jt0BdRfTXv3EXUmwRI',
    plan: ESubscriptionPlan.STANDARD_ANNUAL,
    billingInterval: EPaymentFrequency.ANNUAL,
  },
  {
    planName: 'Premium',
    currency: 'AUD',
    planAmount: 1000,
    billingInterval: EPaymentFrequency.MONTHLY,
    priceId: 'price_1PhUQNJt0BdRfTXvgLspt35c',
    plan: ESubscriptionPlan.PREMIUM_MONTHLY,
  },
  {
    planName: 'Premium',
    currency: 'AUD',
    planAmount: 10000,
    priceId: 'price_1PhUQdJt0BdRfTXvmcB4Hhgw',
    plan: ESubscriptionPlan.PREMIUM_ANNUAL,
    billingInterval: EPaymentFrequency.ANNUAL,
  },
];
