import { env } from '@/constants';
import { UserWithId } from '@/features/user/types/User';
import { postRequest } from '@/lib/fetch';

import { SignupFormRequest } from '../types/SignupFormRequest';

export async function postUserSignupForm(form: SignupFormRequest): Promise<UserWithId | null> {
  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;
    const response = await postRequest<UserWithId>(url, form);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
