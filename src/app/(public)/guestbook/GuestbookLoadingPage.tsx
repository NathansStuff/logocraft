import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function GuestbookLoadingPage(): React.JSX.Element {
  return (
    <Card className='mx-auto mt-4 max-w-md'>
      <CardHeader>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-6 w-32' /> {/* Simulates Guestbook title */}
          <Skeleton className='h-4 w-48' /> {/* Simulates Leave a message description */}
        </div>
        <CardContent className='mt-4'>
          <div className='flex flex-col gap-4'>
            {/* Simulates multiple guestbook messages */}
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-4/6' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-4/6' />
          </div>
          <div className='mt-6'>
            {/* Simulates Guestbook form */}
            <Skeleton className='h-10 w-full' /> {/* Input field */}
            <Skeleton className='mt-4 h-10 w-32' /> {/* Submit button */}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default GuestbookLoadingPage;
