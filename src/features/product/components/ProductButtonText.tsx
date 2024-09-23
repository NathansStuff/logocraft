'use client';

import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';

import { Product } from '../types/Product';

interface Props {
  product: Product;
}

function ProductButtonText({ product }: Props): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const { oneTimePurchases } = user || [];
  const alreadyPurchased = oneTimePurchases?.includes(product.productId);

  if (alreadyPurchased) {
    return (
      <Button asChild>
        <Link href={`/product/${product.productId.toString()}`}>View Product</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link href={`/checkout/product/${product.productId.toString()}`}>
        <p>Purchase</p>
      </Link>
    </Button>
  );
}

export default ProductButtonText;
