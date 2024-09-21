import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { ValidateTokenRequest } from '../types/ValidateTokenRequest';

export async function validateToken(token: string): Promise<boolean> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/validate-token`;
    const form: ValidateTokenRequest = {
      token,
    };
    const response = await postRequest<{ isValid: boolean }>(url, form);

    return response.data.isValid;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
