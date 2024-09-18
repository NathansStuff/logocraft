import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { logout, selectUser } from '@/contexts/userSlice';
import { loginUserAction } from '@/features/user/hooks/loginUserAction';

export function AuthListener(): null {
  const stateUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const user = session?.user;

  // Listens for authentication events
  useEffect(() => {
    if (!user && stateUser.email) {
      dispatch(logout());
    } else if (user?.email && user.email !== stateUser.email) {
      loginUserAction(user.id);
    }
  }, [user, stateUser, dispatch]);

  // Render nothing - this component just dispatches actions
  return null;
}
