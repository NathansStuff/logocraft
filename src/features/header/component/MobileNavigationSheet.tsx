'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { useMobileNavigation } from '@/features/header/hooks/useMobileNavigation';
import Link from 'next/link';
import { headerLinks } from '../data/headerLinks';

function MobileNavigationSheet() {
  const { isOpen, onClose } = useMobileNavigation();
  const isLoggedIn = true; //todo

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
      direction='right'
    >
      <DrawerContent className='dark:bg-black bg-white shadow-lg space-y-6 p-6 h-screen w-full sm:w-screen border-border'>
        <div className='h-full flex flex-col gap-6 justify-center items-center'>
          <div className='w-full flex justify-center items-center'>
            <NavigationMenu>
              <NavigationMenuList className='flex flex-col items-center w-full gap-3 text-primary'>
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
                      <NavigationMenuLink className='hover:text-primary-foreground transition-colors duration-200'>
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
              >
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
              <Button
                asChild
                className='w-full'
              >
                <Link href='/logout'>Logout</Link>
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
