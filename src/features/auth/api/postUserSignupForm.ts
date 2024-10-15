import { UserWithId } from '@/features/user/types/User';

import { SignupFormRequest } from '../types/SignupFormRequest';
import { BaseApiClient } from '@/lib/BaseApiClient';

export async function postUserSignupForm(form: SignupFormRequest): Promise<UserWithId | null> {
  try {
    const url = `/api/auth/register`;
    const response = await BaseApiClient.post<UserWithId>(url, form);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
