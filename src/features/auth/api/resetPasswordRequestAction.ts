import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { ResetPasswordFormRequest } from '../types/ResetPasswordFormRequest';

export async function resetPasswordRequestAction(form: ResetPasswordFormRequest): Promise<boolean> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password-request`;
    await postRequest(url, form);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}
