import { BaseApiClient } from '@/lib/BaseApiClient';

export async function postValidateUser(userId: string): Promise<boolean> {
  try {
    const url = `/api/auth/validate-email/${userId}`;
    const response = await BaseApiClient.get<{ isValid: boolean }>(url);

    return response.data.isValid;
  } catch (error) {
    return false;
  }
}
