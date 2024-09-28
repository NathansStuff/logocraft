import { Product } from '@/features/product/types/Product';

import { EPaymentFrequency } from '../user/types/EPaymentFrequency';
import { ESubscriptionPlan } from '../user/types/ESubscriptionPlan';

import { EProductType } from './types/EProductType';

export const products: Product[] = [
  {
    name: 'E-book',
    description: 'A comprehensive guide to mastering web development.',
    priceId: 'price_1PmQFQJt0BdRfTXvOr29mm6d',
    productId: 'prod_QdheVGXMjZOnMp',
    amount: '1999', // $19.99
    type: EProductType.ONE_TIME_PURCHASE,
  },
  {
    name: 'Online Course',
    description: 'A 12-week course on advanced JavaScript techniques.',
    priceId: 'price_1PmQG6Jt0BdRfTXvbKY0WmjV',
    productId: 'prod_QdhfR1hszyp5lW',
    amount: '4999', // $49.99
    type: EProductType.ONE_TIME_PURCHASE,
  },
  {
    name: 'Awesome Credits x 5',
    description: '500 credits to use on our platform.',
    priceId: 'price_1Q2DcpJt0BdRfTXvPQ2cHe3X',
    productId: 'prod_Qu1gT1TEHPz6Kl',
    amount: '3000',
    tokens: 5,
    type: EProductType.CREDITS,
  },
  {
    name: 'Awesome Credits x 10',
    description: '500 credits to use on our platform.',
    priceId: 'price_1Q2DbVJt0BdRfTXv2IinfxIv',
    productId: 'prod_Qu1eq5NGBGS0A7',
    amount: '5000',
    type: EProductType.CREDITS,
    tokens: 10,
  },
  {
    name: 'Free Tier',
    description: 'Access to our platform with limited features.',
    priceId: 'price_1PhUNJJt0BdRfTXvdPt3LnJc',
    productId: 'prod_QYbafraBYafBHC',
    amount: '0',
    subscription: ESubscriptionPlan.FREE,
    type: EProductType.SUBSCRIPTION,
  },
  {
    name: 'Standard Tier',
    description: 'Access to our platform with limited features.',
    priceId: 'price_1PhUQ9Jt0BdRfTXvlnTQRKWN',
    productId: 'prod_QYbdL4oSbVBaFz',
    amount: '0',
    subscription: ESubscriptionPlan.STANDARD_MONTHLY,
    paymentFrequency: EPaymentFrequency.MONTHLY,
    type: EProductType.SUBSCRIPTION,
  },
  {
    name: 'Premium Tier',
    description: 'Premium access to our platform.',
    priceId: 'price_1PhUQNJt0BdRfTXvgLspt35c',
    productId: 'prod_QYbd7FN2qnPyOW',
    amount: '0',
    subscription: ESubscriptionPlan.PREMIUM_MONTHLY,
    paymentFrequency: EPaymentFrequency.MONTHLY,
    type: EProductType.SUBSCRIPTION,
  },
  {
    name: 'Standard Tier',
    description: 'Access to our platform with limited features.',
    priceId: 'price_1PhUQ9Jt0BdRfTXv3EXUmwRI',
    productId: 'prod_QYbdL4oSbVBaFz',
    amount: '0',
    subscription: ESubscriptionPlan.STANDARD_ANNUAL,
    paymentFrequency: EPaymentFrequency.ANNUAL,
    type: EProductType.SUBSCRIPTION,
  },
  {
    name: 'Premium Tier',
    description: 'Premium access to our platform.',
    priceId: 'price_1PhUQdJt0BdRfTXvmcB4Hhgw',
    productId: 'prod_QYbd7FN2qnPyOW',
    amount: '0',
    subscription: ESubscriptionPlan.PREMIUM_ANNUAL,
    paymentFrequency: EPaymentFrequency.ANNUAL,
    type: EProductType.SUBSCRIPTION,
  },
];
