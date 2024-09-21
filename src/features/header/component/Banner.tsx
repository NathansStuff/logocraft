import React from 'react';

import { ArrowRight } from 'lucide-react';

function Banner() {
  return (
    <div className='flex items-center justify-center gap-3 bg-black py-3 text-sm text-white dark:bg-white/10 dark:text-black'>
      <p className='hidden text-white/60 dark:text-white/60 md:block'>
        Craft stunning logos effortlessly and elevate your brand&apos;s identity.
      </p>
      <div className='inline-flex items-center gap-1 dark:text-white'>
        <p className=''>Get started for free</p>
        <ArrowRight className='inline-flex size-4 items-center justify-center' />
      </div>
    </div>
  );
}

export default Banner;
