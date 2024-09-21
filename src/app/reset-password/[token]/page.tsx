import React from 'react';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';
import { validateToken } from '@/features/account/server/accountService';

import InvalidTokenPageSection from './InvalidTokenPageSection';
import ValidTokenPageSection from './ValidTokenPageSection';

interface ResetPasswordWithTokenPageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordWithTokenPage({
  params,
}: ResetPasswordWithTokenPageProps): Promise<React.JSX.Element> {
  const { token } = params;

  const isValid = await validateToken(token);

  return (
    <>
      <LoggedOutOnly />
      {isValid ? <ValidTokenPageSection token={token} /> : <InvalidTokenPageSection />}
    </>
  );
}
