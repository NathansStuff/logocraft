import { ResetPasswordRequest } from '../types/ResetPasswordRequest';
import { BaseApiClient } from '@/lib/BaseApiClient';

export async function postUserNewPassword(form: ResetPasswordRequest): Promise<boolean> {
  try {
    const url = `/api/auth/new-password`;
    return await (
      await BaseApiClient.post<boolean>(url, form)
    ).data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
