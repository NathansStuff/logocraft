import React from 'react';

import Redirect from '@/components/container/Redirect';
import CheckStripe from '@/features/stripe/components/CheckStripe';

export default function ProductSuccessPage(): React.JSX.Element {
  return (
    <>
      <CheckStripe />
      <Redirect
        message='Checkout successful!'
        href='/products'
      />
    </>
  );
}
