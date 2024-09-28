import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { products } from '../products';
import { EProductType } from '../types/EProductType';

import ProductButtonText from './ProductButtonText';

export default function ProductsList(): React.JSX.Element {
  return (
    <Card className='mx-auto max-w-4xl'>
      <CardHeader className='flex flex-col items-center'>
        <CardTitle className='text-center text-xl md:text-2xl'>Products for Purchase</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2'>
          {products.map((product, index) => {
            if (product.type !== EProductType.ONE_TIME_PURCHASE) {
              return null;
            }
            return (
              <Card key={index}>
                <CardHeader className='flex flex-col items-center'>
                  <CardTitle className='text-center text-xl md:text-2xl'>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                  <CardDescription className='text-center'>{product.description}</CardDescription>
                  <div className='mt-4 text-2xl font-bold text-blue-600'>${parseInt(product.amount) / 100}</div>
                </CardContent>
                <CardFooter className='flex justify-center'>
                  <ProductButtonText product={product} />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
