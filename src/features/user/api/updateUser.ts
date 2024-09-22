import { env } from '@/constants';
import { store } from '@/contexts/store';
import { updateRequest } from '@/lib/fetch';

import { UserPartial, UserWithId } from '../types/User';

export async function updateUser(data: UserPartial): Promise<UserWithId | null> {
  const userId = store.getState().user._id;

  try {
    const url = `${env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`;
    const response = await updateRequest<UserWithId | null>(url, data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
