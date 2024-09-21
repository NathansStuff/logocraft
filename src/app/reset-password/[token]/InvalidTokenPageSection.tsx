import React from 'react';

import Link from 'next/link';

function InvalidTokenPageSection(): React.JSX.Element {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12'>
      <div className='max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
        <h2 className='text-2xl font-semibold text-red-600'>Invalid Token</h2>
        <p className='mt-4 text-gray-600'>The reset password token you provided is either invalid or has expired.</p>
        <p className='mt-2 text-gray-600'>Please request a new password reset link.</p>
        <Link
          href='/reset-password'
          className='mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Request New Link
        </Link>
        <p className='mt-4 text-gray-500'>
          <Link
            href='/login'
            className='underline'
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default InvalidTokenPageSection;
