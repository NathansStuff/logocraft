'use client';

import React, { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import Redirect from '@/components/container/Redirect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { SubscriptionPlan } from '@/features/user/types/SubscriptionPlan';
import { stripePromise } from '@/lib/clientStripe';

import { cancelIncompleteSubscription } from '../api/cancelIncompleteSubscription';
import { createSubscription } from '../api/createSubscription';
import { subscriptionPlans } from '../data/subscriptionPlans';
import { formatPlanInfo } from '../utils/formatPlanInfo';

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

  const handleCancel = async (): Promise<void> => {
    setSelectedPlan(null); // Clear selected plan and go back to plan selection
    setClientSecret(''); // Clear clientSecret if a plan was selected before
    if (!stripeCustomerId) return;
    await cancelIncompleteSubscription({ stripeCustomerId });
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
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className=''>Manage Your Plan</CardTitle>
        <CardDescription>
          {selectedPlan
            ? `You have chosen: ${formatPlanInfo(selectedPlan)}`
            : 'You do not have a subscripton. Choose a plan'}
        </CardDescription>
      </CardHeader>{' '}
      <CardContent>
        {!selectedPlan && !clientSecret && (
          <div className='flex flex-col gap-2'>
            {subscriptionPlans.map((plan, index) => (
              <Button
                key={index}
                onClick={() => handlePlanSelect(plan)}
                className='w-full'
              >
                {formatPlanInfo(plan)}
              </Button>
            ))}
          </div>
        )}
        {errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
        {selectedPlan && clientSecret && (
          <>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: 'stripe' },
              }}
            >
              <ProductPaymentForm clientSecret={clientSecret} />
            </Elements>
            <Button
              variant='secondary'
              onClick={handleCancel}
              className='w-full'
            >
              {selectedPlan ? 'Cancel' : 'Go Back'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateSubscription;
