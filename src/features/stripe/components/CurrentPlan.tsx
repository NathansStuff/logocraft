'use client';

import React, { useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

interface CurrentPlanProps {
  currentPlan: SubscriptionPlan | null;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({ currentPlan }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { stripeCustomerId, subscriptionCancelDate } = user;

  useEffect(() => {
    const checkAndCancelSubscription = async (): Promise<void> => {};

    checkAndCancelSubscription();
  }, [subscriptionCancelDate, stripeCustomerId, user._id, dispatch]);

  const handleReEnableSubscription = async (): Promise<void> => {};

  if (!currentPlan) {
    return <Loader2 className='size-8' />;
  }

  return <></>;
};

export default CurrentPlan;
