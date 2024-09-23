import React from 'react';

import PageLayout from '@/components/container/PageLayout';
import ProductsList from '@/features/product/components/ProductsList';

function ProductsPage(): React.JSX.Element {
  return (
    <PageLayout>
      <ProductsList />
    </PageLayout>
  );
}

export default ProductsPage;
