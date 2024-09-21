'use client';

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectUser } from '@/contexts/userSlice';
import { cn } from '@/lib/utils';

export function ProfileDropdown(): React.JSX.Element {
  const user = useAppSelector(selectUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = user?.isAuthenticated;
  const image = user?.profilePicture;

  const handleMouseEnter = (): void => setDropdownOpen(true);
  const handleMouseLeave = (): void => setDropdownOpen(false);

  return (
    <div
      className='relative'
      onMouseLeave={handleMouseLeave}
    >
      {isLoggedIn ? (
        <>
          <div
            onMouseEnter={handleMouseEnter}
            className='flex h-full cursor-pointer items-center justify-center focus:outline-none'
          >
            <Avatar className='flex items-center justify-center'>
              {image ? (
                <Image
                  height={32}
                  width={32}
                  src={image}
                  alt='User Avatar'
                  className='h-8 w-8 rounded-full'
                />
              ) : (
                <AvatarFallback>
                  <FaUserCircle className='h-8 w-8 text-gray-700 dark:text-gray-300' />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          {dropdownOpen && (
            <>
              <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn('absolute right-0 w-48 rounded-lg border-none')}
              >
                <Button
                  variant={'ghost'}
                  asChild
                  className='block w-full rounded-b-lg px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                >
                  <Link href='/profile'>Profile</Link>
                </Button>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    signOut({
                      callbackUrl: '/',
                    })
                  }
                  className='block w-full rounded-b-lg px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                >
                  Logout
                </Button>
              </Card>
            </>
          )}
        </>
      ) : (
        <Button variant='accent'>
          <Link
            href='/login'
            passHref
            legacyBehavior
          >
            Login
          </Link>
        </Button>
      )}
    </div>
  );
}
