import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Product } from '../types/Product';

interface Props {
  product: Product;
}

export default function ProductSection({ product }: Props): React.JSX.Element {
  return (
    <>
      <Card className='mx-auto max-w-md'>
        <CardHeader className='flex flex-col items-center'>
          <CardTitle className='text-center text-xl md:text-2xl'>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          <CardDescription className='text-center'>{product.description}</CardDescription>
        </CardContent>{' '}
        <CardFooter className='flex justify-center'>${parseInt(product.amount) / 100}</CardFooter>
      </Card>
    </>
  );
}
