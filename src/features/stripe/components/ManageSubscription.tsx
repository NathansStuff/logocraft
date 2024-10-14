'use client';

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns'; // Make sure to install date-fns if not already installed
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { isSubscriptionUpgrade } from '@/features/product/utils/isSubscriptionUpgrade';
import { subscriptionPlans } from '@/features/stripe/data/subscriptionPlans';
import { EPaymentFrequency } from '@/features/user/types/EPaymentFrequency';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { pollForUserUpdate } from '@/features/user/utils/pollForUserUpdate';
import UseConfirm from '@/hooks/UseConfirm';
import { formatCurrency } from '@/utils/formatCurrency';

import { changeSubscription } from '../api/changeSubscription';
import { deleteSubscription } from '../api/deleteSubscription';
import { reenableSubscription } from '../api/reenableSubscription';

function ManageSubscription(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { data: session, status } = useSession();
  const authUser = session?.user;
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(user.currentPlan);
  const [ConfirmDialog, confirm] = UseConfirm('Are you sure?', 'This will cancel your subscription');
  const [ConfirmResubDialog, confirmResub] = UseConfirm('Are you sure?', 'This will reactivate your plan.');
  const [ConfirmChangePlanDialog, confirmChangePlan] = UseConfirm(
    'Are you sure?',
    'This will change your subscription plan.'
  );
  const [loading, setLoading] = useState(false);
  const { subscriptionCancelDate } = user;
  const stripeSubscriptionId = user.stripeSubscriptionId;
  const [nextBillingDate, setNextBillingDate] = useState<Date | null>(null);
  const [pendingDowngrade, setPendingDowngrade] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    const fetchNextBillingDate = async () => {
      if (user.stripeSubscriptionId) {
        try {
          const response = await fetch(`/api/stripe/subscription-details?id=${user.stripeSubscriptionId}`);
          const data = await response.json();
          if (data.current_period_end) {
            setNextBillingDate(new Date(data.current_period_end * 1000)); // Convert UNIX timestamp to Date
          }
        } catch (error) {
          console.error('Error fetching next billing date:', error);
        }
      }
    };

    fetchNextBillingDate();
  }, [user.stripeSubscriptionId]);

  const handleUpdatePlan = (newPlan: SubscriptionPlan): void => {
    setCurrentPlan(newPlan);
  };

  const handleCancelSubscription = async (): Promise<void> => {
    const ok = await confirm();
    if (!ok || !stripeSubscriptionId || !authUser?.id) return;

    setLoading(true);
    try {
      await deleteSubscription({ stripeSubscriptionId });
      await pollForUserUpdate(authUser.id, (user) => user.subscriptionCancelDate !== null);
      setCurrentPlan(null);
    } catch (error) {
      toast.error('Failed to cancel subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = async (plan: SubscriptionPlan): Promise<void> => {
    if (currentPlan?.plan === plan.plan) return;

    if (!stripeSubscriptionId || !currentPlan || !authUser?.id) return;

    const isUpgrade = isSubscriptionUpgrade(currentPlan, plan);
    const confirmMessage = isUpgrade
      ? 'This will upgrade your plan immediately. Do you want to continue?'
      : 'This will downgrade your plan at the end of your current billing cycle. Do you want to continue?';

    const ok = await confirmChangePlan();
    if (!ok) return;

    setLoading(true);
    try {
      console.log('Changing subscription:', { currentPlan, newPlan: plan });
      const { isDowngrade, effectiveDate } = await changeSubscription({
        stripeSubscriptionId,
        newPriceId: plan.priceId,
        oldPriceId: currentPlan.priceId,
      });
      console.log('Change subscription result:', { isDowngrade, effectiveDate });

      if (isDowngrade) {
        setPendingDowngrade(plan);
        console.log('Setting pending downgrade:', plan);
        toast.success(
          `Your plan will be downgraded to ${plan.planName} on ${new Date(effectiveDate).toLocaleDateString()}.`
        );
      } else {
        const updatedUser = await pollForUserUpdate(
          authUser.id,
          (user) => user.currentPlan?.plan === plan.plan || user.pendingPlan?.plan === plan.plan
        );
        console.log('Updated user after change:', updatedUser);
        setCurrentPlan(updatedUser.currentPlan);
        setPendingDowngrade(updatedUser.pendingPlan || null);
        toast.success(
          isUpgrade ? 'Subscription plan upgraded successfully.' : 'Subscription plan change scheduled successfully.'
        );
      }

      // Refresh the next billing date
      setNextBillingDate(new Date(effectiveDate));
    } catch (error) {
      console.error('Error changing subscription:', error);
      toast.error('Failed to change subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  async function handleReactivate(): Promise<void> {
    const ok = await confirmResub();
    if (!ok || !stripeSubscriptionId || !authUser?.id) return;

    setLoading(true);
    try {
      await reenableSubscription({ stripeSubscriptionId });
      const updatedUser = await pollForUserUpdate(authUser.id, (user) => user.subscriptionCancelDate === null);
      setCurrentPlan(updatedUser.currentPlan);
    } catch (error) {
      toast.error('Failed to reactivate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function formatPlanInfo(plan: SubscriptionPlan): string {
    return `${plan.planName} Tier - ${formatCurrency(plan.planAmount, plan.currency)}/${plan.billingInterval === EPaymentFrequency.MONTHLY ? 'Monthly' : 'Annually'} ${plan.currency}`;
  }

  return (
    <>
      <ConfirmDialog />
      <ConfirmResubDialog />
      <ConfirmChangePlanDialog />
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
            <>
              <p className='pb-4 text-center text-sm'>Current Plan: {formatPlanInfo(currentPlan)}</p>
              {user.pendingPlan && (
                <p className='pb-4 text-center text-sm text-yellow-600'>
                  Pending change to {formatPlanInfo(user.pendingPlan)} on next billing cycle
                </p>
              )}
              {nextBillingDate && (
                <p className='pb-4 text-center text-sm'>Next Billing Date: {format(nextBillingDate, 'MMMM d, yyyy')}</p>
              )}
            </>
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
      {pendingDowngrade && (
        <div className='mt-4 rounded-md bg-yellow-100 p-4'>
          <p className='text-sm text-yellow-700'>
            Your plan will be downgraded to {pendingDowngrade.planName} on {nextBillingDate?.toLocaleDateString()}.
          </p>
        </div>
      )}
    </>
  );
}

export default ManageSubscription;
