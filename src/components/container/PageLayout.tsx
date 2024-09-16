import React from 'react';

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-5 flex justify-center items-center w-full '>
      <div className='container max-w-7xl'>{children}</div>
    </div>
  );
}

export default PageLayout;
