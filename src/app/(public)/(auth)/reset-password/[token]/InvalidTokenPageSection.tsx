import React from 'react';

import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvalidTokenPageSection(): React.JSX.Element {
  return (
    <section className='flex min-h-screen items-center justify-center bg-gray-100 py-12'>
      <Card className='max-w-md text-center'>
        <CardHeader>
          <CardTitle className='text-red-600'>Invalid Token</CardTitle>
        </CardHeader>
        <CardContent className=''>
          <p>The reset password token you provided is either invalid or has expired.</p>
          <p className='mt-4'>Please request a new password reset link.</p>
        </CardContent>

        <CardFooter>
          <Link
            href='/reset-password'
            className='text-link'
          >
            Request New Link
          </Link>
          <p className='mt-4 text-gray-500'>
            <Link
              href='/login'
              className='text-link'
            >
              Back to Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
