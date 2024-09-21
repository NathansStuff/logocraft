import { getUser } from '@/apiCalls/user/getUser';
import { store } from '@/contexts/store';
import { setUser } from '@/contexts/userSlice';

import { updateStripeCustomer } from '../stripe/updateStripeCustomer';

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
    await updateStripeCustomer(fetchedUser.email);
  } catch (error) {
    console.error('Error logging in:', error);
  }
}
