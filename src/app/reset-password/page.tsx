import React from 'react';

import LoggedOutOnly from '@/components/container/LoggedOutOnly';

function ResetPasswordPage(): React.JSX.Element {
  return (
    <>
      <LoggedOutOnly />

      <div>ResetPasswordPage</div>
    </>
  );
}

export default ResetPasswordPage;
