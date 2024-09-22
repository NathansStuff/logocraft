import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: 'Standard',
    annual: false,
    amount: '500',
    priceId: 'price_1PhUQ9Jt0BdRfTXvlnTQRKWN',
    plan: ESubscriptionPlan.STANDARD_MONTHLY,
  },
  {
    name: 'Standard',
    annual: true,
    amount: '5000',
    priceId: 'price_1PhUQ9Jt0BdRfTXv3EXUmwRI',
    plan: ESubscriptionPlan.STANDARD_ANNUAL,
  },
  {
    name: 'Premium',
    annual: false,
    amount: '1000',
    priceId: 'price_1PhUQNJt0BdRfTXvgLspt35c',
    plan: ESubscriptionPlan.PREMIUM_MONTHLY,
  },
  {
    name: 'Premium',
    annual: true,
    amount: '10000',
    priceId: 'price_1PhUQdJt0BdRfTXvmcB4Hhgw',
    plan: ESubscriptionPlan.PREMIUM_ANNUAL,
  },
];
