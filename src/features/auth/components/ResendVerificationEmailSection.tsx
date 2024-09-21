'use client';

import React, { useEffect } from 'react';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';

import { resendVerificationEmail } from '../api/resendVerificationEmail';

export default function ResendVerificationEmailSection(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { _id } = user;

  useEffect(() => {
    function sendVerificationEmail(): void {
      if (!_id) return;
      resendVerificationEmail(_id);
    }
    sendVerificationEmail();
  }, [_id]);

  return <></>;
}
