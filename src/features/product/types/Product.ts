import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';
import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';

export interface Product {
  name: string;
  description: string;
  priceId: string;
  amount: string;
  productId: string;
  oneTimePurchase?: boolean;
  repurchasable?: boolean;
  tokens?: number;
  subscription?: ESubscriptionPlan;
  paymentFrequency?: EPaymentFrequency;
}
