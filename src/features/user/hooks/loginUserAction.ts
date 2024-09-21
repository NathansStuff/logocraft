//todo

import { NEXT_PUBLIC_BASE_URL } from '@/constants';
import { store } from '@/contexts/store';
import { setUser } from '@/contexts/userSlice';
import { UserWithId } from '@/features/user/types/User';
import { getRequest } from '@/lib/fetch';

export async function getUser(id: string): Promise<any> {
  try {
    const url = `${NEXT_PUBLIC_BASE_URL}/api/user/${id}`;
    const response = await getRequest<UserWithId>(url);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}

export async function loginUserAction(id: string): Promise<void> {
  try {
    const fetchedUser = await getUser(id);
    if (!fetchedUser) return;
    store.dispatch(
      setUser({
        ...fetchedUser,
        isAuthenticated: true,
        primaryId: fetchedUser.email,
        profilePicture: fetchedUser.imageUrl,
        _id: fetchedUser._id.toString(),
      })
    );
    // Check the user's Stripe purchases on login success
    // await updateStripeCustomer(fetchedUser.email);
  } catch (error) {
    console.error('Error logging in:', error);
  }
}
