'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';

function VerifedOnly(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user?.isEmailVerified) {
      router.push('/signup-success');
    }
  }, [user, router]);
  return <></>;
}

export default VerifedOnly;
