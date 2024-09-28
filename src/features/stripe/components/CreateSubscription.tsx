'use client';

import React, { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import Redirect from '@/components/container/Redirect';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { stripePromise } from '@/lib/clientStripe';
import { convertToSubcurrency } from '@/utils/convertToSubcurrency';

import { createSubscription } from '../api/createSubscription';
import { subscriptionPlans } from '../data/subscriptionPlans';

import ProductPaymentForm from './ProductPaymentForm';

const CreateSubscription = (): React.JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const user = useAppSelector(selectUser);
  const { email, stripeCustomerId } = user;
  const [errorMessage, setErrorMessage] = useState(''); // State to manage the error message

  useEffect(() => {
    if (!selectedPlan || !stripeCustomerId || !email) return;
    const fetchClientSecret = async (): Promise<void> => {
      try {
        const response = await createSubscription({
          email,
          priceId: selectedPlan.priceId,
          customerId: stripeCustomerId,
          userId: user._id.toString(),
        });

        if (response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          setErrorMessage('Error: Unable to create payment. Please try again later.');
        }
      } catch (error) {
        setErrorMessage('Error: Unable to create payment. Please try again later.');
        console.error('Error creating PaymentIntent:', error);
      }
    };

    fetchClientSecret();
  }, [selectedPlan, email, stripeCustomerId, user._id]);

  const handlePlanSelect = (plan: SubscriptionPlan): void => {
    setSelectedPlan(plan);
  };

  if (!email) {
    return (
      <Redirect
        message='Please log in to purchase a product.'
        href='/login'
      />
    );
  }

  return (
    <div className='flex w-full items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-4 text-center text-2xl font-bold text-gray-800'>
          You do not have a subscripton. Choose a plan
        </h1>
        <div className='space-y-4'>
          {subscriptionPlans.map((plan, index) => (
            <button
              key={index}
              className='relative w-full rounded-md bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.name} - ${convertToSubcurrency(plan.amount)} ({plan.annual ? 'Annual' : 'Monthly'})
            </button>
          ))}
        </div>
        {errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
        {selectedPlan && clientSecret && (
          <>
            <h1>
              You have chosen: {selectedPlan.name} - ${convertToSubcurrency(selectedPlan.amount)} /
              {selectedPlan.annual ? 'Annual' : 'Monthly'}
            </h1>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: 'stripe' },
              }}
            >
              <ProductPaymentForm clientSecret={clientSecret} />
            </Elements>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateSubscription;
