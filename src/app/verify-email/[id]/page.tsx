'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { postValidateUser } from '@/apiCalls/postValidateUser';
import PageWrapper from '@/components/PageComponents/PageWrapper';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser, setUser } from '@/contexts/userSlice';

interface ValidateUserPageProps {
  params: {
    id: string;
  };
}

export default function ValidateUserPage({ params }: ValidateUserPageProps) {
  const { id } = params;
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(selectUser);
  const isLoggedIn = user.isAuthenticated;
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function validateUser() {
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
  }, [id, router]);

  if (loading) {
    return (
      <PageWrapper
        isPublic
        allowUnverified
      >
        <main className='flex-center w-full flex-grow'>
          <LoadingSpinner />
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      isPublic
      allowUnverified
    >
      <main className='flex-center w-full flex-grow'>
        <div className='w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md'>
          {isValid ? (
            <p className='text-lg'>
              Your email has been successfully validated! You will be redirected to the homepage shortly.
            </p>
          ) : (
            <p className='text-lg'>Error: The validation link is invalid or has expired. Please try again.</p>
          )}
        </div>
      </main>
    </PageWrapper>
  );
}
