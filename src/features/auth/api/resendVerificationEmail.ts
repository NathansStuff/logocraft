import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

export async function resendVerificationEmail(id: string): Promise<boolean> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/resend-verification-email/${id}`;
    return (await getRequest<boolean>(url)).data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
