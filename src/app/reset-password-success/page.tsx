import React from 'react';

import Link from 'next/link';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function ResetPasswordSuccessPage(): React.JSX.Element {
  return (
    <section className='flex w-full items-center justify-center p-8'>
      <LoggedOutOnly />
      <Card className='max-w-lg text-center'>
        <CardHeader>
          <CardTitle>Password Reset Email Sent</CardTitle>
        </CardHeader>
        <CardContent className='text-sm'>
          <p>
            We&apos;ve sent you a link to reset your password. The link will expire in 6 hours. <br />
            <br />
            Didn&apos;t receive the email? Check your junk folder or request another link{' '}
            <Link
              href='/reset-password'
              className='text-link'
            >
              here
            </Link>
            .
            <br />
            <br />
            You can close this window once you&apos;re done.
          </p>
        </CardContent>
        <CardFooter className='flex w-full justify-center text-center text-xs text-gray-500 dark:text-gray-400'>
          <p>
            If you&apos;re still having trouble,{' '}
            <Link
              href='/contact'
              className='text-link'
            >
              contact support
            </Link>{' '}
            for assistance.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default ResetPasswordSuccessPage;
