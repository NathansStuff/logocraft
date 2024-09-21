'use client';

import { useEffect } from 'react';
import { BiLogoGoogle } from 'react-icons/bi';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <section className='flex flex-grow items-center justify-center'>
        <Button
          className='flex items-center gap-3 rounded border border-transparent bg-blue-600 px-4 py-2 align-middle text-sm text-white transition duration-150 ease-in-out hover:bg-blue-500'
          onClick={() =>
            signIn('google', {
              callbackUrl: '/profile',
            })
          }
        >
          <BiLogoGoogle className='text-2xl' /> Sign in with Google
        </Button>
      </section>
    </>
  );
};

export default SignIn;
