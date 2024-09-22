'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

export default function RedirectToLogin(): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [router]);

  return <></>; // This component doesn't need to render anything
}
