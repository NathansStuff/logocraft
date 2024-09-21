'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoggedOutOnly(): React.JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // if (session?.user) {
    //   router.push('/');
    // }

    console.log('logged out only');
    console.log(window.location.href);
  }, [session, router]);
  return <></>;
}

export default LoggedOutOnly;
