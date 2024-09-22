import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewPasswordForm from '@/features/auth/components/NewPasswordForm';

interface Props {
  token: string;
}

function ValidTokenPageSection({ token }: Props): React.JSX.Element {
  return (
    <section className='flex w-full items-center justify-center p-8'>
      <Card className='max-w-lg text-center'>
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-concrete pb-10'>Please enter your new password below.</p>
          <NewPasswordForm token={token} />
        </CardContent>
      </Card>
    </section>
  );
}

export default ValidTokenPageSection;
