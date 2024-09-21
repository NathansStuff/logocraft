'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { store } from '@/contexts/store';

import { AuthListener } from './AuthListener';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';
import SheetProvider from './SheetProvider';
import { ThemeProvider } from './ThemeProvider';

function ClientProviders({ children, session }: { children: ReactNode; session: Session | null }): ReactNode {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        <Provider store={store}>
          <SessionProvider session={session}>
            <AuthProvider>
              <AuthListener />
              <QueryProvider>
                <Toaster position='top-right' />
                <SheetProvider />
                {children}
              </QueryProvider>
            </AuthProvider>
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default ClientProviders;
