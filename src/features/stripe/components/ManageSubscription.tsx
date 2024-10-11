'use client';

import React, { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { loginUserAction } from '@/features/user/hooks/loginUserAction';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import UseConfirm from '@/hooks/UseConfirm';

import { changeSubscription } from '../api/changeSubscription';
import { deleteSubscription } from '../api/deleteSubscription';
import { reenableSubscription } from '../api/reenableSubscription';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { formatPlanInfo } from '../utils/formatPlanInfo';

function ManageSubscription(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { data: session, status } = useSession();
  const authUser = session?.user;
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(user.currentPlan);
  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This will cancel your subscription');
  const [ConfirmResubDialog, confirmResub] = UseConfirm('Are you sure?', 'This will reactivate your plan.');
  const [loading, setLoading] = useState(false);
  const { subscriptionCancelDate } = user;
  const stripeSubscriptionId = user.stripeSubscriptionId;

  const handleUpdatePlan = (newPlan: SubscriptionPlan): void => {
    setCurrentPlan(newPlan);
  };

  const handleCancelSubscription = async (): Promise<void> => {
    const ok = await confirm();
    if (!ok) return;
    if (!stripeSubscriptionId || !authUser?.id) return;

    setLoading(true);
    try {
      await deleteSubscription({ stripeSubscriptionId });

      // Poll for subscription update
      const pollInterval = 500; // 0.5 seconds
      const maxAttempts = 10; // 5 seconds total

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        const updatedUser = await loginUserAction(authUser.id);
        if (updatedUser.subscriptionCancelDate) {
          setCurrentPlan(null);
          break;
        }
      }
    } catch (error) {
      toast.error('Failed to cancel subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handlePlanSelect = async (plan: SubscriptionPlan): Promise<void> => {
    if (currentPlan?.plan === plan.plan) return; // No need to update if the same plan is selected

    if (!stripeSubscriptionId || !currentPlan) return;
    await changeSubscription({ stripeSubscriptionId, newPriceId: plan.priceId, oldPriceId: currentPlan.priceId });
  };

  async function handleReactivate(): Promise<void> {
    const ok = await confirmResub();
    if (!ok || !stripeSubscriptionId || !authUser?.id) return;

    setLoading(true);
    try {
      await reenableSubscription({ stripeSubscriptionId });

      // Poll for subscription update
      const pollInterval = 500; // 0.5 seconds
      const maxAttempts = 10; // 5 seconds total

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        const user = await loginUserAction(authUser.id);
        if (!user.subscriptionCancelDate) {
          setCurrentPlan(user.currentPlan);
          break;
        }
      }
    } catch (error) {
      toast.error('Failed to reactivate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ConfirmDialog />
      <ConfirmResubDialog />
      <Card className='relative mx-auto max-w-md'>
        {loading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/50'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        )}
        <CardHeader className='text-center'>
          <CardTitle className=''>Manage Your Plan</CardTitle>
          <CardDescription>View and manage your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          {currentPlan && !subscriptionCancelDate && (
            <p className='pb-4 text-center text-sm'>Current Plan: {formatPlanInfo(currentPlan)}</p>
          )}
          {subscriptionCancelDate && (
            <div className='flex flex-col gap-2'>
              <p className='pb-4 text-center text-lg'>
                Your subscription will end on {new Date(parseInt(subscriptionCancelDate) * 1000).toLocaleDateString()}
              </p>
              <Button onClick={handleReactivate}>Reactive</Button>
            </div>
          )}

          {!subscriptionCancelDate && (
            <div className='mx-auto flex flex-col gap-2'>
              {subscriptionPlans.map((plan, index) => (
                <Button
                  key={index}
                  onClick={() => handlePlanSelect(plan)}
                  disabled={currentPlan?.plan === plan.plan}
                  className='relative w-full'
                >
                  {formatPlanInfo(plan)}
                  {currentPlan?.plan === plan.plan && (
                    <span className='absolute right-1 top-[6px] rounded-full bg-yellow-500 px-2 py-1 text-xs text-white'>
                      Current Plan
                    </span>
                  )}
                </Button>
              ))}
              {currentPlan && (
                <Button
                  className='w-full rounded-md'
                  variant={'destructive'}
                  onClick={handleCancelSubscription}
                >
                  Cancel Subscription
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default ManageSubscription;
