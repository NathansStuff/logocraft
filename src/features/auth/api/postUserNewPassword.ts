import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { ResetPasswordRequest } from '../types/ResetPasswordRequest';

export async function postUserNewPassword(form: ResetPasswordRequest): Promise<boolean> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/new-password`;
    return await (
      await postRequest<boolean>(url, form)
    ).data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
