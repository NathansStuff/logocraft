'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoggedInOnly(): React.JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      router.push('/');
    }
  }, [session, router]);
  return <></>;
}

export default LoggedInOnly;
