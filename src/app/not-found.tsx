import { ReactElement } from 'react';

import Link from 'next/link';

// If you're using Next.js
import { Button } from '@/components/ui/button'; // Assuming you have a Button component for navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function NotFound(): ReactElement {
  return (
    <Card className='mx-auto mt-10 max-w-lg text-center'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>404 - Page Not Found</CardTitle>
        <CardDescription className='mt-2 text-gray-500'>
          Oops! It seems the page you&apos;re looking for doesn&apos;t exist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mt-4 text-lg'>
          The page you are trying to access might have been removed, renamed, or is temporarily unavailable.
        </p>
        <Button
          className='mt-6'
          asChild
        >
          <Link href='/'>Go back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default NotFound;
