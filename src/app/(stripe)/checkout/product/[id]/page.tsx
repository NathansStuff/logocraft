import React from 'react';

import CreatePurchase from '@/features/stripe/components/CreatePurchase';

interface PageProps {
  params: {
    id: string;
  };
}

function ProductPage({ params }: PageProps): React.JSX.Element {
  const { id } = params;
  const stripeProductId = id;

  return (
    <>
      <CreatePurchase productId={stripeProductId} />
    </>
  );
}

export default ProductPage;
