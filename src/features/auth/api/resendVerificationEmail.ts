import { toast } from 'sonner';

import { BaseApiClient } from '@/lib/BaseApiClient';

export async function resendVerificationEmail(id: string): Promise<void> {
  const loading = toast.loading('Resending verification email...');
  try {
    const url = `/api/auth/resend-verification-email/${id}`;
    await BaseApiClient.get<boolean>(url);

    toast.dismiss(loading);
    toast.success('Verification email sent!');
  } catch (error) {
    console.log('error', error);
    toast.dismiss(loading);
    toast.error('Error resending verification email, please try again');
    return;
  }
}
