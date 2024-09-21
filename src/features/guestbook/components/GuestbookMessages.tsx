import { ReactNode } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDateRange } from '@/utils/formatDate';

import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

type Props = {
  messages: GuestbookMessageWithUser[];
};

function GuestbookMessages({ messages }: Props): ReactNode {
  return (
    <div className='scrollbar-thumb-primary-muted scrollbar-track-primary-muted h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-corner-rounded-full hover:scrollbar-thumb-sky-500 active:scrollbar-thumb-sky-400'>
      {messages.map((entry: GuestbookMessageWithUser, i) => (
        <Card
          key={i}
          className='m-2 rounded-lg border bg-white shadow-lg dark:bg-gray-800'
        >
          <CardHeader className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-2'>
              <Avatar className='size-7'>
                {entry.userId.imageUrl ? (
                  <Image
                    src={entry.userId.imageUrl || '/default-avatar.png'}
                    alt={`${entry.userId.name}'s profile`}
                    width={28}
                    height={28}
                    className='rounded-full'
                  />
                ) : (
                  <AvatarFallback>
                    <FaUserCircle className='size-7 text-gray-700 dark:text-gray-300' />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className='flex flex-col justify-center'>
                <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{entry.userId.name}</h4>
                <h5 className='text-xs text-gray-500 dark:text-gray-400'>{entry.userId.email}</h5>
              </div>
            </div>
          </CardHeader>

          <CardContent className='px-6 py-4 text-sm text-gray-700 dark:text-gray-300'>
            <p>{entry.message}</p>
          </CardContent>

          <CardFooter className='flex justify-end p-4 dark:border-gray-700'>
            <p className='text-xs text-gray-500 dark:text-gray-400'>{formatDateRange(entry.createdAt)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default GuestbookMessages;
