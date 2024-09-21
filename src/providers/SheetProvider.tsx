'use client';

import { ReactNode } from 'react';
import { useMountedState } from 'react-use';

import MobileNavigationSheet from '@/features/header/component/MobileNavigationSheet';

function SheetProvider(): ReactNode {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MobileNavigationSheet />
    </>
  );
}

export default SheetProvider;
