import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import { selectIsLoaded, setIsLoaded } from '@/contexts/displaySlice';
import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { logout, selectUser } from '@/contexts/userSlice';
import { loginUserAction } from '@/features/user/hooks/loginUserAction';

export function AuthListener(): null {
  const stateUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoaded = useAppSelector(selectIsLoaded);

  // New flag to track session and state synchronization
  const [isSyncComplete, setIsSyncComplete] = useState(false);

  // Sync authentication between NextAuth and Redux
  useEffect(() => {
    if (!user && stateUser.email) {
      dispatch(logout());
    } else if (user?.email && user.email !== stateUser.email) {
      loginUserAction(user.id).then(() => {
        setIsSyncComplete(true); // Mark sync as complete once login action is done
      });
    } else {
      setIsSyncComplete(true); // Sync is complete even if no user is logged in
    }
  }, [user, stateUser, dispatch]);

  // Set isLoaded after synchronization between NextAuth and Redux is complete
  useEffect(() => {
    if (!isSyncComplete) return; // Wait until sync between NextAuth and Redux is done

    // When session status is still loading
    if (status === 'loading') {
      if (isLoaded) {
        dispatch(setIsLoaded(false));
      }
      return;
    }

    // When user is unauthenticated
    if (status === 'unauthenticated') {
      if (!isLoaded) {
        console.log('User is not authenticated');
        dispatch(setIsLoaded(true));
      }
      return;
    }

    // When user is authenticated
    if (status === 'authenticated') {
      const isLoggedIn = stateUser?.isAuthenticated;

      if (isLoggedIn && !isLoaded) {
        dispatch(setIsLoaded(true));
      } else if (!isLoggedIn && isLoaded) {
        dispatch(setIsLoaded(false));
      }
    }
  }, [status, stateUser, isLoaded, isSyncComplete, dispatch]);

  return null;
}
