import React, { ReactNode } from 'react';

import Header from '@/features/header/component/Header';

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props): ReactNode {
  return (
    <div className='bg-[#EAEEFE]'>
      <Header />
      {children}
    </div>
  );
}

export default PublicLayout;
