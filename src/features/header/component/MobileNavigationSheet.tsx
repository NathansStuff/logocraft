'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useMobileNavigation } from '@/features/header/hooks/useMobileNavigation';
import Link from 'next/link';

function MobileNavigationSheet() {
  const { isOpen, onClose } = useMobileNavigation();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <Button asChild>
          <Link href='/login'>Login</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavigationSheet;
