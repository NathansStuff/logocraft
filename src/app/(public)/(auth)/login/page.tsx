import React from 'react';

import Link from 'next/link';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '@/features/auth/components/AuthForm';

function SignInPage(): React.JSX.Element {
  return (
    <section className='mx-4 overflow-hidden'>
      <LoggedOutOnly />
      <Card className='mx-auto mt-10 max-w-lg text-center'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Welcome Back</CardTitle>
          <CardDescription className='mt-2 text-gray-500'>Login to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-2'>
          <AuthForm formType='login' />
        </CardContent>
        <CardFooter className='flex flex-col gap-3 text-xs text-muted-foreground'>
          <p className=''>
            Forgot your password?{' '}
            <Link
              href='/reset-password'
              className='text-link'
            >
              Reset it here
            </Link>
          </p>
          <p className=''>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='text-link'
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default SignInPage;
