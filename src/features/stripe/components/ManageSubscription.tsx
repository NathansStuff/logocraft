'use client';

import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { useState } from 'react';
import CurrentPlan from './CurrentPlan';
import SwitchMembership from './SwitchMembership';

const ManageSubscription = () => {
  const [showSwitchOptions, setShowSwitchOptions] = useState(false);
  const user = useAppSelector(selectUser);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(user.currentPlan);

  const handleSwitchMembership = () => {
    setShowSwitchOptions(true);
  };

  const handleSwitchBack = () => {
    setShowSwitchOptions(false);
  };

  const handleUpdatePlan = (newPlan: SubscriptionPlan) => {
    setCurrentPlan(newPlan);
  };

  return (
    <div className='flex w-full items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-bold text-gray-800'>Manage Your Plan</h1>
        {showSwitchOptions ? (
          <SwitchMembership
            currentPlan={currentPlan}
            onSwitchBack={handleSwitchBack}
            onUpdatePlan={handleUpdatePlan}
          />
        ) : (
          <CurrentPlan
            currentPlan={currentPlan}
            onSwitchMembership={handleSwitchMembership}
          />
        )}
      </div>
    </div>
  );
};

export default ManageSubscription;
