import React from 'react';

import { Product } from '../types/Product';

interface Props {
  product: Product;
}

export default function ProductSection({ product }: Props): React.JSX.Element {
  return (
    <main className='flex-center w-full flex-grow'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md'>
        <h1 className='text-2xl font-semibold'>{product.name}</h1>
        <p className='text-lg text-gray-600'>{product.description}</p>
        <div className='mt-4 text-2xl font-bold text-blue-600'>${parseInt(product.amount) / 100}</div>
      </div>
    </main>
  );
}
