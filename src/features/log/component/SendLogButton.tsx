'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUserId } from '@/contexts/userSlice';
import { useCreateLog } from '@/features/log/api/useCreateLog';

import { CreateLogRequest } from '../types/CreateLogRequest';
import { ELogType } from '../types/ELogType';

function SendLogButton(): ReactNode {
  const mutation = useCreateLog();
  const userId = useAppSelector(selectUserId);

  function onClick(): void {
    const logToSave: CreateLogRequest = {
      userId,
      action: ELogType.USER_ACTION,
      details: 'Test log ',
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
