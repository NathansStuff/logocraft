import React, { ReactNode } from 'react';

type Props = {
  children: React.ReactNode;
};

function PublicLayout({ children }: Props): ReactNode {
  return (
    <>
      {/* <div className='bg-[#EAEEFE]'> */}
      {/* <Header /> */}
      {children}

      {/* </div> */}
    </>
  );
}

export default PublicLayout;
