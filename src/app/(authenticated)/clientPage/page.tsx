'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

function ClientPage() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <Button onClick={handleClick}>{count}</Button>
    </div>
  );
}

export default ClientPage;
