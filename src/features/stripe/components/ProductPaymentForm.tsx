'use client';

import { useState } from 'react';
import React from 'react';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { env } from '@/constants';
interface Props {
  clientSecret: string;
}

const ProductPaymentForm = ({ clientSecret }: Props): React.JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // Call elements.submit() to validate the form inputs
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || errorMessage);
        setLoading(false);
        return;
      }

      // Confirm the payment after successful form submission
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${env.NEXT_PUBLIC_BASE_URL}/checkout/product-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message ?? 'Payment Failed');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-md bg-white p-2'
    >
      <PaymentElement />
      {errorMessage && <div className='text-red-500'>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className='mt-2 w-full rounded-md bg-black p-5 font-bold text-white disabled:animate-pulse disabled:opacity-50'
      >
        {!loading ? 'Purchase' : 'Processing...'}
      </button>
    </form>
  );
};

export default ProductPaymentForm;
