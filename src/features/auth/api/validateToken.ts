import { BaseApiClient } from '@/lib/BaseApiClient';

import { ValidateTokenRequest } from '../types/ValidateTokenRequest';

export async function validateToken(token: string): Promise<boolean> {
  try {
    const url = '/api/auth/validate-token';
    const form: ValidateTokenRequest = {
      token,
    };
    const response = await BaseApiClient.post<{ isValid: boolean }>(url, form);

    return response.data.isValid;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
