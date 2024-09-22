'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProfilePageLoading(): ReactNode {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // 5 seconds delay

    // Cleanup the timer in case the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Card className='mx-auto mt-10 max-w-lg text-center'>
      <CardHeader className='flex flex-row items-center justify-center gap-2'>
        <Avatar>
          <Skeleton className='h-10 w-10 rounded-full' />
        </Avatar>
        <div className='flex flex-col justify-center gap-0 text-sm'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='mt-2 h-4 w-32' />
        </div>
      </CardHeader>
    </Card>
  );
}

export default ProfilePageLoading;
