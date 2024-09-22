import React from 'react';

import Link from 'next/link';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PasswordResetRequestForm from '@/features/auth/components/PasswordResetRequestForm';

function ResetPasswordPage(): React.JSX.Element {
  return (
    <>
      <LoggedOutOnly />
      <section className='flex w-full items-center justify-center p-8'>
        <Card className='max-w-lg text-center'>
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription className='text-xs'>
              If you signed up with an email and password, you can reset your password below.
            </CardDescription>
          </CardHeader>
          <CardContent className='text-sm'>
            <PasswordResetRequestForm />
          </CardContent>
          <CardFooter className='flex w-full justify-center text-center text-xs text-gray-500 dark:text-gray-400'>
            <Link
              href='/login'
              className='text-link'
            >
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export default ResetPasswordPage;
