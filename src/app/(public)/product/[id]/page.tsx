'use client';

import React from 'react';

import { Route } from 'next';

import PageLayout from '@/components/container/PageLayout';
import Redirect from '@/components/container/Redirect';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import ProductSection from '@/features/product/components/ProductSection';
import { products } from '@/features/product/products';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { oneTimePurchases } = user || [];
  const product = products.find((product) => product.productId === params.id);

  if (!product) {
    return (
      <>
        <Redirect
          message='This product does not exist.'
          href='/'
        />
      </>
    );
  }

  const hasPurchased = oneTimePurchases?.includes(product.productId);

  if (!hasPurchased) {
    return (
      <>
        <Redirect
          message='You have not purchased this product yet.'
          href={`/checkout/product/${product.productId}` as unknown as Route} // todo:
        />
      </>
    );
  }

  return (
    <PageLayout>
      <ProductSection product={product} />
    </PageLayout>
  );
}
