import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

export async function postValidateUser(userId: string): Promise<boolean> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/validate-email/${userId}`;
    const response = await getRequest<{ isValid: boolean }>(url);

    return response.data.isValid;
  } catch (error) {
    return false;
  }
}
