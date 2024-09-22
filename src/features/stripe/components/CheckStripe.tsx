'use client';

import React, { useEffect } from 'react';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectEmail } from '@/contexts/userSlice';

import { updateStripeCustomer } from '../api/updateStripeCustomer';

function CheckStripe(): React.JSX.Element {
  const email = useAppSelector(selectEmail);

  useEffect(() => {
    void updateStripeCustomer(email);
  }, [email]);

  return <></>;
}

export default CheckStripe;
