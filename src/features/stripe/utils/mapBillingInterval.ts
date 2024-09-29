import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';

export function mapBillingInterval(interval: 'day' | 'week' | 'month' | 'year'): EPaymentFrequency {
  switch (interval) {
    case 'month':
      return EPaymentFrequency.MONTHLY;
    case 'year':
      return EPaymentFrequency.ANNUAL;
    default:
      throw new Error(`Unexpected billing interval: ${interval}`);
  }
}
