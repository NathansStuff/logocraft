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

  function ConfirmationDialog(): ReactNode {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className='pt-2'>
            <Button
              onClick={handleCancel}
              variant='outline'
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return [ConfirmationDialog, confirm];
}

export default UseConfirm;
