import { ArrowRight } from 'lucide-react';
import React from 'react'

function Banner() {
  return (
    <div className='flex justify-center items-center py-3 bg-black text-white dark:bg-white/10 dark:text-black text-sm gap-3'>
      <p className='text-white/60 dark:text-white/60 hidden md:block'>
        Streamline your workflow and boost your productivity
      </p>
      <div className='inline-flex gap-1 items-center dark:text-white'>
        <p className=''>Get started for free</p>
        <ArrowRight className='w-4 h-4 inline-flex justify-center items-center' />
      </div>
    </div>
  );
}

export default Banner