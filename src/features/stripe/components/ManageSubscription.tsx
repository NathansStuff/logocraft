'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import UseConfirm from '@/hooks/UseConfirm';

import { cancelIncompleteSubscription } from '../api/cancelIncompleteSubscription';
import { changeSubscription } from '../api/changeSubscription';
import { reenableSubscription } from '../api/reenableSubscription';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { formatPlanInfo } from '../utils/formatPlanInfo';

function ManageSubscription(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(user.currentPlan);
  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This will cancel your subscription');
  const { stripeCustomerId, subscriptionCancelDate } = user;
  const stripeSubscriptionId = user.stripeSubscriptionId;

  const handleUpdatePlan = (newPlan: SubscriptionPlan): void => {
    setCurrentPlan(newPlan);
  };

  const handleCancelSubscription = async (): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;
    if (!stripeCustomerId) return;

    await cancelIncompleteSubscription({ stripeCustomerId });

    // todo: Redirect / success
  };
  const handleReEnableSubscription = async (): Promise<void> => {
    if (!stripeSubscriptionId) return;
    const success = await reenableSubscription({ stripeSubscriptionId });
  };

  const handlePlanSelect = async (plan: SubscriptionPlan): Promise<void> => {
    if (currentPlan?.plan === plan.plan) return; // No need to update if the same plan is selected

    if (subscriptionCancelDate) {
      await handleReEnableSubscription();
      return;
    }
    if (!stripeSubscriptionId || !currentPlan) return;
    await changeSubscription({ stripeSubscriptionId, newPriceId: plan.priceId, oldPriceId: currentPlan.priceId });
  };

  return (
    <>
      <ConfirmDialog />
      <Card className=''>
        <CardHeader className='text-center'>
          <CardTitle className=''>Manage Your Plan</CardTitle>
          <CardDescription>View and manage your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          {currentPlan && !subscriptionCancelDate && (
            <p className='pb-4 text-center text-sm'>Current Plan: {formatPlanInfo(currentPlan)}</p>
          )}
          {subscriptionCancelDate && (
            <p className='pb-4 text-center text-lg'>
              Your subscription will end on {new Date(parseInt(subscriptionCancelDate) * 1000).toLocaleDateString()}
            </p>
          )}

          <div className='flex flex-col gap-2'>
            {subscriptionPlans.map((plan, index) => (
              <Button
                key={index}
                onClick={() => handlePlanSelect(plan)}
                disabled={currentPlan?.plan === plan.plan && !subscriptionCancelDate}
                className='relative w-full'
              >
                {subscriptionCancelDate && 'Rejoin at '}
                {formatPlanInfo(plan)}
                {currentPlan?.plan === plan.plan && (
                  <span className='absolute right-1 top-[6px] rounded-full bg-yellow-500 px-2 py-1 text-xs text-white'>
                    Current Plan
                  </span>
                )}
              </Button>
            ))}
            {currentPlan && !subscriptionCancelDate && (
              <Button
                className='w-full rounded-md'
                variant={'destructive'}
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ManageSubscription;
