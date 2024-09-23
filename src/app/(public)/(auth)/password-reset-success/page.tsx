import React from 'react';

import RedirectToLogin from '@/components/container/RedirectToLogin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuccessPage(): React.JSX.Element {
  return (
    <>
      <RedirectToLogin />
      <section className='flex h-screen items-center justify-center bg-gray-100'>
        <Card className='text-center'>
          <CardHeader>
            <CardTitle>Password Reset Successful</CardTitle>
          </CardHeader>
          <CardContent className=''>
            <p>You will be redirected to the login page shortly.</p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
