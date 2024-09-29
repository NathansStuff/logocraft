import React from 'react';

import { useAppDispatch, useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';

import { subscriptionPlans } from '../data/subscriptionPlans';

interface SwitchMembershipProps {
  currentPlan: SubscriptionPlan | null;
  onSwitchBack: () => void;
  onUpdatePlan: (newPlan: SubscriptionPlan) => void;
}

const SwitchMembership: React.FC<SwitchMembershipProps> = ({ currentPlan, onSwitchBack, onUpdatePlan }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handlePlanSelect = async (plan: SubscriptionPlan): Promise<void> => {
    if (currentPlan?.plan === plan.plan) return; // No need to update if the same plan is selected
  };

  if (!currentPlan) {
    return <p>Loading...{!currentPlan && 'no current plan'}</p>;
  }

  return (
    <div className='space-y-4'>
      {subscriptionPlans.map((plan, index) => (
        <button
          key={index}
          className={`w-full rounded-md px-4 py-3 font-semibold text-white ${
            currentPlan?.plan === plan.plan ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={() => handlePlanSelect(plan)}
          disabled={currentPlan?.plan === plan.plan} // Disable button for the current plan
        >
          Current Plan: {currentPlan.planName} - {currentPlan.planAmount} {currentPlan.currency}/
          {currentPlan.billingInterval}
          {currentPlan?.plan === plan.plan && (
            <span className='absolute right-1 top-1 rounded-full bg-yellow-500 px-2 py-1 text-xs text-white'>
              Current Plan
            </span>
          )}
        </button>
      ))}
      <button
        className='mt-2 w-full rounded-md bg-gray-600 px-4 py-3 font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50'
        onClick={onSwitchBack}
      >
        Back to Current Plan
      </button>
    </div>
  );
};

export default SwitchMembership;
