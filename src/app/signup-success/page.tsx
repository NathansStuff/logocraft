import React from 'react';

import Link from 'next/link';

import LoggedInOnly from '@/components/container/LoggedInOnly';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupSuccessPage(): React.JSX.Element {
  return (
    <section className='flex w-full items-center justify-center p-8'>
      <LoggedInOnly />
      <Card className='max-w-lg text-center'>
        <CardHeader>
          <CardTitle>Signup Complete</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='text-sm'>
          <p>
            A verification email has been sent to your inbox to finalize your account setup. <br />
            <br />
            Didn&apos;t get the email? Check your spam folder, or click below to request a new verification link. <br />
            <br />
            Feel free to close this window once you&apos;re done.
          </p>
        </CardContent>
        <CardFooter className='flex w-full justify-center text-center text-xs text-gray-500 dark:text-gray-400'>
          <p>
            Still not received?{' '}
            <Link
              href='/resend-verification-email'
              className='text-primary underline'
            >
              Resend Verification Email
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
