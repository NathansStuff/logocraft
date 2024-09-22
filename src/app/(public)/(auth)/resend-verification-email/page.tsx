import React from 'react';

import Link from 'next/link';

import LoggedInOnly from '@/components/container/LoggedInOnly';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ResendVerificationEmailSection from '@/features/auth/components/ResendVerificationEmailSection';

export default function ResentVerificationSuccessPage(): React.JSX.Element {
  return (
    <>
      <LoggedInOnly />
      <ResendVerificationEmailSection />
      <section className='flex w-full items-center justify-center p-8'>
        <Card className='max-w-lg text-center'>
          <CardHeader>
            <CardTitle>Verification Email Resent</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We&apos;ve resent the verification email to your registered email address.</p>
            <p className='mt-4'>Please check your inbox and follow the instructions to complete your signup process.</p>
            <p className='mt-4'>You can close this window if you&apos;re done.</p>
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
    </>
  );
}
