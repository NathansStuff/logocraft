'use client';

import React, { useEffect, useState } from 'react';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

import PageLayout from './PageLayout';

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
    <PageLayout>
      <Card className='mx-auto mt-10 max-w-lg text-center'>
        <CardHeader>
          <CardTitle>Redirect</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {' '}
          Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default Redirect;
