import React from 'react';

import ProductsList from '@/features/product/components/ProductsList';

function ProductsPage(): React.JSX.Element {
  return (
    <div className='flex-center w-full flex-col space-y-4 px-4'>
      <div className='py-10'>Products for Purchase</div>
      <ProductsList />
    </div>
  );
}

export default ProductsPage;
