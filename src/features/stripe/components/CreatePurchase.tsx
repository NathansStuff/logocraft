'use client';

import React, { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import Redirect from '@/components/container/Redirect';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { products } from '@/features/product/products';
import { stripePromise } from '@/lib/stripe';

import { createPurchase } from '../api/createPurchase';

import ProductPaymentForm from './ProductPaymentForm';

interface CreatePurchaseProps {
  productId: string;
}

const CreatePurchase = ({ productId }: CreatePurchaseProps): React.JSX.Element => {
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to manage the error message
  const user = useAppSelector(selectUser);
  const { email, stripeCustomerId } = user;

  const selectedProduct = products.find((p) => p.productId === productId);
  const purchasedProducts = user.oneTimePurchases;

  useEffect(() => {
    if (!selectedProduct || !stripeCustomerId || !email) return;
    const fetchClientSecret = async (): Promise<void> => {
      try {
        const response = await createPurchase({
          email,
          priceId: selectedProduct.priceId,
          customerId: stripeCustomerId,
          userId: user._id,
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
  }, [selectedProduct, email, stripeCustomerId, user._id]);

  if (purchasedProducts?.includes(productId)) {
    return (
      <Redirect
        message='You have already purchased this product.'
        href='/'
      />
    );
  }

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
        <h1 className='mb-4 text-center text-2xl font-bold text-gray-800'>Complete Your Purchase</h1>
        {selectedProduct && (
          <p className='mb-4 text-center'>
            {selectedProduct.name} - ${selectedProduct.amount}
          </p>
        )}
        {errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: 'stripe' },
            }}
          >
            <ProductPaymentForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CreatePurchase;
