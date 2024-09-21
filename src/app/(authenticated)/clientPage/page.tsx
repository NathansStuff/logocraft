'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';

function ClientPage(): ReactNode {
  const [count, setCount] = useState(0);
  function handleClick(): void {
    setCount(count + 1);
  }
  return (
    <div>
      <Button onClick={handleClick}>{count}</Button>
    </div>
  );
}

export default ClientPage;
