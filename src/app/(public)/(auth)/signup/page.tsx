import React from 'react';

import Link from 'next/link';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '@/features/auth/components/AuthForm';

function SignUpPage(): React.JSX.Element {
  return (
    <section className='mx-4 overflow-hidden'>
      <LoggedOutOnly />
      <Card className='mx-auto mt-10 max-w-lg text-center'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Sign Up</CardTitle>
          <CardDescription className='mt-2 text-gray-500'>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-2'>
          <AuthForm formType='signup' />
        </CardContent>
        <CardFooter className='flex flex-col gap-3 text-xs text-muted-foreground'>
          <p className=''>
            Already have an account?{' '}
            <Link
              href='/login'
              className='text-link'
            >
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default SignUpPage;
