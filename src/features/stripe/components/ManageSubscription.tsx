'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import UseConfirm from '@/hooks/UseConfirm';

import { subscriptionPlans } from '../data/subscriptionPlans';
import { formatPlanInfo } from '../utils/formatPlanInfo';

function ManageSubscription(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(user.currentPlan);
  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This will cancel your subscription');
  const { stripeCustomerId, subscriptionCancelDate } = user;

  const handleUpdatePlan = (newPlan: SubscriptionPlan): void => {
    setCurrentPlan(newPlan);
  };

  const handleCancelSubscription = async (): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;

    // await post request to delete this category
  };
  const handleReEnableSubscription = async (): Promise<void> => {};

  const handlePlanSelect = async (plan: SubscriptionPlan): Promise<void> => {
    if (currentPlan?.plan === plan.plan) return; // No need to update if the same plan is selected
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
          {currentPlan && <p className='pb-4 text-center text-sm'>Current Plan: {formatPlanInfo(currentPlan)}</p>}

          <div className='flex flex-col gap-2'>
            {subscriptionPlans.map((plan, index) => (
              <Button
                key={index}
                onClick={() => handlePlanSelect(plan)}
                disabled={currentPlan?.plan === plan.plan}
                className='relative w-full'
              >
                {formatPlanInfo(plan)}
                {currentPlan?.plan === plan.plan && (
                  <span className='absolute right-1 top-1 rounded-full bg-yellow-500 px-2 py-1 text-xs text-white'>
                    Current Plan
                  </span>
                )}
              </Button>
            ))}
            {currentPlan && (
              <>
                {subscriptionCancelDate ? (
                  <>
                    <button
                      className='mt-2 w-full rounded-md bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
                      onClick={handleReEnableSubscription}
                    >
                      Re-enable Subscription
                    </button>
                    <p className='mt-2 text-sm text-gray-500'>
                      Your subscription will end on{' '}
                      {new Date(parseInt(subscriptionCancelDate) * 1000).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <Button
                    className='w-full rounded-md'
                    variant={'destructive'}
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ManageSubscription;
