'use client';

import { useMountedState } from 'react-use';

import MobileNavigationSheet from '@/features/header/component/MobileNavigationSheet';

function SheetProvider() {
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
