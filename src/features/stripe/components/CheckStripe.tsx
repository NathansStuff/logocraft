'use client';

import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { loginUserAction } from '@/features/user/hooks/loginUserAction';

function CheckStripe(): React.JSX.Element {
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (!user) return;
    void loginUserAction(user.id);
  }, [user]);

  return <></>;
}

export default CheckStripe;
