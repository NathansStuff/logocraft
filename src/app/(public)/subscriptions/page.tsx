'use client';

import React from 'react';

import PageLayout from '@/components/container/PageLayout';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import CreateSubscription from '@/features/stripe/components/CreateSubscription';
import ManageSubscription from '@/features/stripe/components/ManageSubscription';

const SubscriptionPage = (): React.JSX.Element => {
  const user = useAppSelector(selectUser);
  const { stripeSubscriptionId } = user;

  return <PageLayout>{stripeSubscriptionId ? <ManageSubscription /> : <CreateSubscription />}</PageLayout>;
};

export default SubscriptionPage;
