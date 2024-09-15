'use client';

import { AuthListener } from './AuthListener';
import SheetProvider from './SheetProvider';
import { ThemeProvider } from './ThemeProvider';

function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        <AuthListener>
          <SheetProvider />
          {children}
        </AuthListener>
      </ThemeProvider>
    </>
  );
}

export default ClientProviders;
