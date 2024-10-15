'use client';

import { ReactNode } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/contexts/storeHooks';
import { selectIsAuthenticated } from '@/contexts/userSlice';
import { useMobileNavigation } from '@/features/header/hooks/useMobileNavigation';
import { signOut } from 'next-auth/react';

import { getHeaderLinks } from '../utils/getHeaderLinks';

function MobileNavigationSheet(): ReactNode {
  const { isOpen, onClose } = useMobileNavigation();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const headerLinks = getHeaderLinks(isLoggedIn);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
      direction='right'
    >
      <DrawerContent className='h-screen w-full space-y-6 border-border bg-white p-6 shadow-lg sm:w-screen'>
        <div className='flex h-full flex-col items-center justify-center gap-6'>
          <div className='flex w-full items-center justify-center'>
            <NavigationMenu>
              <NavigationMenuList className='flex w-full flex-col items-center gap-3 text-primary'>
                {headerLinks.map((link, index) => (
                  <NavigationMenuItem
                    key={index}
                    className='w-full text-center'
                  >
                    <Link
                      href={link.href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className='transition-colors duration-200 hover:text-primary-foreground'>
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Separator className='w-full' />
          {/* Conditional rendering based on login state */}
          {isLoggedIn ? (
            <>
              <Button
                asChild
                className='w-full'
                variant={'secondary'}
              >
                <Link href='/profile'>Profile</Link>
              </Button>
              <Button
                className='w-full'
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              className='w-full'
            >
              <Link href='/login'>Login</Link>
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileNavigationSheet;
