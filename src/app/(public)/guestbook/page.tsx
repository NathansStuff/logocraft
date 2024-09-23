'use client';

import { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetGuestbookMessages } from '@/features/guestbook/api/useGetGuestbookMessage';
import GuestbookForm from '@/features/guestbook/components/GuestbookForm';
import GuestbookMessages from '@/features/guestbook/components/GuestbookMessages';

import GuestbookLoadingPage from './GuestbookLoadingPage';

function GuestbookPage(): ReactNode {
  const guestbookMessageQuery = useGetGuestbookMessages();

  const isLoading = guestbookMessageQuery.isLoading;

  const messages = guestbookMessageQuery.data?.messages ?? [];

  if (isLoading) {
    return <GuestbookLoadingPage />;
  }

  return (
    <Card className='mx-auto mt-4 max-w-md'>
      <CardHeader>
        <CardTitle>Guestbook</CardTitle>
        <CardDescription>Leave a message</CardDescription>
        <CardContent>
          <GuestbookMessages messages={messages} />
          <GuestbookForm />
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default GuestbookPage;
