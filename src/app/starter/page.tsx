import { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { env } from '@/constants/serverEnv';

function StarterPage(): ReactNode {
  console.log(env.NODE_ENV);
  return (
    <Card className='mx-auto mt-4 max-w-md'>
      <CardHeader>
        <CardTitle>Next.js Starter</CardTitle>
        <CardDescription>List of stuff</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A simple starter for Next.js</p>
      </CardContent>
      <CardFooter>
        <p>Nathan O&apos;Donnell</p>
      </CardFooter>
    </Card>
  );
}

export default StarterPage;
