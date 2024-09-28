import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';
import { ESubscriptionPlan } from '@/features/user/types/ESubscriptionPlan';

import { EProductType } from './EProductType';

export interface Product {
  name: string;
  description: string;
  priceId: string;
  amount: string;
  productId: string;
  type: EProductType;
  tokens?: number;
  subscription?: ESubscriptionPlan;
  paymentFrequency?: EPaymentFrequency;
}
