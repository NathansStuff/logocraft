'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser, setUser } from '@/contexts/userSlice';
import { postValidateUser } from '@/features/auth/api/postValidateUser';

interface ValidateUserPageProps {
  params: {
    id: string;
  };
}

export default function ValidateUserPage({ params }: ValidateUserPageProps): React.JSX.Element {
  const { id } = params;
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(selectUser);
  const isLoggedIn = user.isAuthenticated;
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function validateUser(): Promise<void> {
      const result = await postValidateUser(id);
      setIsValid(result);
      setLoading(false);

      if (result) {
        // Update user context with email verification status
        if (isLoggedIn) {
          dispatch(setUser({ ...user, isEmailVerified: true }));
        }
        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    }

    validateUser();
  }, [id, router, dispatch, user, isLoggedIn]);

  if (loading) {
    return (
      <section className='flex w-full flex-grow items-center justify-center'>
        <Card className='max-w-md text-center'>
          <CardContent className='text-lg'>
            <Skeleton className='mb-4 h-6 w-3/4' />
            <Skeleton className='mb-2 h-6 w-2/3' />
            <Skeleton className='h-6 w-1/2' />
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className='flex w-full flex-grow items-center justify-center'>
      <Card className='max-w-md text-center'>
        <CardContent className='text-lg'>
          {isValid ? (
            <p>Your email has been successfully validated! You will be redirected to the homepage shortly.</p>
          ) : (
            <p>Error: The validation link is invalid or has expired. Please try again.</p>
          )}
        </CardContent>
        {isValid && (
          <CardFooter>
            <p className=''>
              Resend your
              <Link
                href='/reset-password'
                className='text-link'
              >
                email verification link{' '}
              </Link>
            </p>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
