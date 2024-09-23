import React from 'react';

import PageLayout from '@/components/container/PageLayout';
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
    <PageLayout>
      <CreatePurchase productId={stripeProductId} />
    </PageLayout>
  );
}

export default ProductPage;
