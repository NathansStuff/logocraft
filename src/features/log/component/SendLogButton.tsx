'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { useCreateLog } from '@/features/log/api/useCreateLog';
import { Log } from '@/features/log/types/Log';

function SendLogButton(): ReactNode {
  const mutation = useCreateLog();

  function onClick(): void {
    const logToSave: Log = {
      message: 'Test log ',
      state: {},
    };

    mutation.mutate(logToSave);
  }

  return (
    <Button
      onClick={onClick}
      disabled={mutation.isPending}
    >
      Send Log
    </Button>
  );
}

export default SendLogButton;
