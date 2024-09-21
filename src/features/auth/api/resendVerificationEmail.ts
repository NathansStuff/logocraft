import { toast } from 'sonner';

import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

export async function resendVerificationEmail(id: string): Promise<void> {
  const loading = toast.loading('Resending verification email...');
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/resend-verification-email/${id}`;
    await getRequest<boolean>(url);

    toast.dismiss(loading);
    toast.success('Verification email sent!');
  } catch (error) {
    console.log('error', error);
    toast.dismiss(loading);
    toast.error('Error resending verification email, please try again');
    return;
  }
}
