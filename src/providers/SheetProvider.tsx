'use client';

import MobileNavigationSheet from '@/features/header/component/MobileNavigationSheet';
import { useMountedState } from 'react-use';

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
