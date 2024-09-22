'use client';

import React from 'react';

import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { Product } from '@/features/product/types/Product';

import { products } from '../products';

export default function ProductsList(): React.JSX.Element {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { oneTimePurchases } = user || [];

  const handleProductSelect = (product: Product): void => {
    // Redirect to the checkout page with the query parameters
    router.push(`/checkout/product/${product.productId.toString()}`);
  };

  return (
    <div className='flex items-center justify-center bg-gray-100 p-6'>
      <div className='grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2'>
        {products.map((product, index) => {
          const alreadyPurchased = oneTimePurchases?.includes(product.productId);
          const productPageUrl = `/product/${product.productId}` as unknown as Route; // todo: this is still experimental

          return (
            <Card
              key={index}
              className={`transition-shadow duration-300 ease-in-out hover:shadow-lg ${alreadyPurchased ? '' : ''}`}
            >
              <CardHeader className='flex flex-col items-center'>
                <CardTitle className='text-center text-xl text-gray-800 md:text-2xl'>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col items-center'>
                <CardDescription className='text-center text-gray-600'>{product.description}</CardDescription>
                <div className='mt-4 text-2xl font-bold text-blue-600'>${parseInt(product.amount) / 100}</div>
              </CardContent>
              <CardFooter className='flex justify-center'>
                {alreadyPurchased ? (
                  <Link
                    href={productPageUrl}
                    className='mt-4 rounded-md bg-green-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                  >
                    View Product
                  </Link>
                ) : (
                  <button
                    className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    onClick={() => handleProductSelect(product)}
                  >
                    Purchase
                  </button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
