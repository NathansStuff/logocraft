'use client';

import React, { useEffect } from 'react';

import { Loader2 } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser, setSubscriptionCancelDate, setUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

interface CurrentPlanProps {
  currentPlan: SubscriptionPlan | null;
  onSwitchMembership: () => void;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({ currentPlan, onSwitchMembership }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { stripeCustomerId, subscriptionCancelDate } = user;

  useEffect(() => {
    const checkAndCancelSubscription = async (): Promise<void> => {
      if (subscriptionCancelDate && parseInt(subscriptionCancelDate) * 1000 < Date.now()) {
        try {
          const res = await fetch('/api/stripe/cancel-subscription-immediate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerId: stripeCustomerId, userId: user._id }),
          });
          const data = await res.json();
          if (data.success) {
            dispatch(setSubscriptionCancelDate(null)); // Clear the cancel date in Redux state
            dispatch(setUser(data.user)); // Update the user state with the updated user data
          } else {
            console.error('Error canceling subscription immediately');
          }
        } catch (error) {
          console.error('Error canceling subscription immediately:', error);
        }
      }
    };

    checkAndCancelSubscription();
  }, [subscriptionCancelDate, stripeCustomerId, user._id, dispatch]);

  const handleCancelSubscription = async (): Promise<void> => {
    try {
      const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: stripeCustomerId, userId: user._id }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setSubscriptionCancelDate(data.cancelDate)); // Update Redux state
        alert('Subscription canceled successfully');
      } else {
        console.error('Error canceling subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  const handleReEnableSubscription = async (): Promise<void> => {
    try {
      const res = await fetch('/api/stripe/re-enable-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: stripeCustomerId, userId: user._id }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setSubscriptionCancelDate(null)); // Update Redux state
        alert('Subscription re-enabled successfully');
      } else {
        console.error('Error re-enabling subscription');
      }
    } catch (error) {
      console.error('Error re-enabling subscription:', error);
    }
  };

  if (!currentPlan) {
    return <Loader2 className='size-8' />;
  }

  return (
    <div className='mb-4 text-center'>
      <p>
        Current Plan: {currentPlan.planName} - {currentPlan.planAmount} {currentPlan.currency}/
        {currentPlan.billingInterval}
      </p>
      {subscriptionCancelDate ? (
        <>
          <button
            className='mt-2 w-full rounded-md bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
            onClick={handleReEnableSubscription}
          >
            Re-enable Subscription
          </button>
          <p className='mt-2 text-sm text-gray-500'>
            Your subscription will end on {new Date(parseInt(subscriptionCancelDate) * 1000).toLocaleDateString()}
          </p>
        </>
      ) : (
        <button
          className='mt-2 w-full rounded-md bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50'
          onClick={handleCancelSubscription}
        >
          Cancel Subscription
        </button>
      )}
      <button
        className='mt-2 w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
        onClick={onSwitchMembership}
      >
        Switch Membership
      </button>
    </div>
  );
};

export default CurrentPlan;
