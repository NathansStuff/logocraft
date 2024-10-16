import { store } from '@/contexts/store';
import { BaseApiClient } from '@/lib/BaseApiClient';

import { UserPartial, UserWithId } from '../types/User';

export async function updateUser(data: UserPartial): Promise<UserWithId | null> {
  const userId = store.getState().user._id;

  try {
    const url = `/api/user/${userId}`;
    const response = await BaseApiClient.put<UserWithId | null>(url, data);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
