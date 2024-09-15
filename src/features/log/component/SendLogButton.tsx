'use client';

import { Button } from '@/components/ui/button';
import { useCreateLog } from '@/features/log/api/useCreateLog';
import { Log } from '../types/Log';

function SendLogButton() {
  const mutation = useCreateLog();

  function onClick() {
    const logToSave: Log = {
      message: `Test log `,
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
