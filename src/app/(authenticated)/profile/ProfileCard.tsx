'use client';

import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { selectEmail, selectName, selectProfilePicture } from '@/contexts/userSlice';

import ProfilePageLoading from './ProfilePageLoading';

function ProfileCard(): React.JSX.Element {
  const { status } = useSession();
  const userName = useSelector(selectName);
  const profilePicture = useSelector(selectProfilePicture);
  const email = useSelector(selectEmail);

  if (status === 'unauthenticated' || !userName) {
    return <ProfilePageLoading />;
  }

  return (
    <Card className='mx-auto mt-10 max-w-lg text-center'>
      <CardHeader className='flex flex-row items-center justify-center gap-2'>
        <Avatar>
          {profilePicture ? (
            <Image
              src={profilePicture || '/default-avatar.png'}
              alt={`${userName}'s profile`}
              width={40}
              height={40}
              className='rounded-full'
            />
          ) : (
            <AvatarFallback>
              <FaUserCircle className='h-8 w-8 text-gray-700 dark:text-gray-300' />
            </AvatarFallback>
          )}
        </Avatar>
        <div className='flex flex-col justify-center gap-0 text-sm'>
          <p className=''>{userName || 'Anonymous User'}</p>
          <p className='text-muted-foreground'>{email}</p>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ProfileCard;
