import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

function SkeletonHomePage(): ReactNode {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-8 w-3/4' />
      <Skeleton className='h-8 w-5/6' />
      <Skeleton className='h-16 w-full' />
      <Skeleton className='h-12 w-2/3' />
    </div>
  );
}

export default SkeletonHomePage;
