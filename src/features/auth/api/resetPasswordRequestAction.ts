import { BaseApiClient } from '@/lib/BaseApiClient';

import { ResetPasswordFormRequest } from '../types/ResetPasswordFormRequest';

export async function resetPasswordRequestAction(form: ResetPasswordFormRequest): Promise<boolean> {
  try {
    const url = '/api/auth/reset-password-request';
    await BaseApiClient.post(url, form);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}
