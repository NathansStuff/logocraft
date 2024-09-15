import Header from '@/features/header/component/Header';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props) {
  return (
    <div className=''>
      <Header />
      {children}
    </div>
  );
}

export default PublicLayout;
