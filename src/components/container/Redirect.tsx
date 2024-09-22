'use client';

import React, { useEffect, useState } from 'react';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

interface Props {
  message: string;
  href: Route;
}

function Redirect({ message, href }: Props): React.JSX.Element {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push(href);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, href]);

  return (
    <div className='flex w-full items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-bold text-gray-800'>{message}</h1>
        <p className='text-center text-gray-600'>
          Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
}

export default Redirect;
