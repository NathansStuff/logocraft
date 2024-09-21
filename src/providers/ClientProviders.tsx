'use client';

import { ReactNode } from 'react';

import { QueryProvider } from './QueryProvider';
import SheetProvider from './SheetProvider';
import { ThemeProvider } from './ThemeProvider';

function ClientProviders({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        {/* <AuthListener> */}
        <QueryProvider>
          <SheetProvider />
          {children}
        </QueryProvider>
        {/* </AuthListener> */}
      </ThemeProvider>
    </>
  );
}

export default ClientProviders;
