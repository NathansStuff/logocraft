import React from 'react';

import NewPasswordForm from '../Forms/NewPasswordForm';

interface Props {
  token: string;
}

function ValidTokenPageSection({ token }: Props): React.JSX.Element {
  return (
    <main className='flex w-full items-center justify-center p-8'>
      <div className='max-w-lg text-center'>
        <h1 className='pb-4 pt-20 text-3xl font-bold lg:text-[40px]'>Reset your password</h1>
        <p className='text-concrete text-md pb-10'>Please enter your new password below.</p>
        <NewPasswordForm token={token} />
      </div>
    </main>
  );
}

export default ValidTokenPageSection;
