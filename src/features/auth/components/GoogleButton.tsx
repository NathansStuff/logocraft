'use client';

import React from 'react';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

import { signInCallback } from '../data/signInCallback';

interface Props {
  formType: 'signup' | 'login';
}

export default function GoogleButton({ formType }: Props): React.JSX.Element {
  return (
    <Button
      onClick={() => signIn('google', signInCallback)}
      className='flex w-full items-center justify-center gap-4 rounded-full border pl-3'
      variant='outline'
    >
      <Image
        src='/google-logo.png'
        height={20}
        width={20}
        alt='Google Logo'
      />
      <span className='py-3 font-semibold'>Sign {formType === 'signup' ? 'up' : 'in'} with Google</span>
    </Button>
  );
}
