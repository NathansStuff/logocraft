'use client';

import { ReactNode, useState } from 'react';

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';

function UseConfirm(title: string, message: string): [() => ReactNode, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (): Promise<unknown> =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = (): void => {
    setPromise(null);
  };

  const handleConfirm = (): void => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = (): void => {
    promise?.resolve(false);
    handleClose();
  };

  const handleCloseButton = (): void => {
    promise?.resolve(false);
    handleClose();
  };

  function ConfirmationDialog(): ReactNode {
    return (
      <Dialog open={promise !== null}>
        <DialogContent
          onInteractOutside={handleCloseButton}
          onEscapeKeyDown={handleCloseButton}
          onClose={handleCloseButton}
        >
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-col gap-2 pt-2'>
            <Button
              className='w-full'
              onClick={handleConfirm}
            >
              Confirm
            </Button>
            <Button
              className='w-full'
              onClick={handleCancel}
              variant='destructive'
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return [ConfirmationDialog, confirm];
}

export default UseConfirm;
