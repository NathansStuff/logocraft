'use client';

import { ReactNode } from 'react';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/logosaas.png';
import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';
import { headerLinks } from '@/features/header/data/headerLinks';
import { useMobileNavigation } from '@/features/header/hooks/useMobileNavigation';

import Banner from './Banner';
import { ProfileDropdown } from './ProfileDropdown';
import ThemeButton from './ThemeButton';

function Header(): ReactNode {
  const { onOpen } = useMobileNavigation();
  const isLoggedIn = true; //todo

  return (
    <header className='sticky top-0 z-20 backdrop-blur-sm'>
      <Banner />
      <PageLayout>
        <div className='flex items-center justify-between'>
          {/* Left: Logo */}
          <div className='flex items-center'>
            <Link href='/'>
              <Image
                src={Logo.src}
                alt='logo'
                height={40}
                width={40}
              />
            </Link>
          </div>

          {/* Middle: Navigation Links */}
          <nav className='hidden flex-1 justify-center md:flex'>
            <div className='flex items-center gap-6'>
              {headerLinks.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className='transition-colors duration-200 hover:text-primary/60'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
          {/* Right: Get Started Button + Theme Button */}
          <div className='hidden items-end gap-4 md:flex'>
            <Button
              asChild
              className='btn btn-primary'
            >
              <Link
                href={isLoggedIn ? '/' : '/'}
                passHref
              >
                {isLoggedIn ? 'Create Now' : 'Get Started for free'}
              </Link>
            </Button>
            <ThemeButton />
            <ProfileDropdown />
          </div>
          {/* Mobile Menu Icon */}
          <MenuIcon
            className='size-5 cursor-pointer text-primary transition-colors duration-200 hover:text-primary/60 md:hidden'
            onClick={onOpen}
          />
        </div>
      </PageLayout>
    </header>
  );
}

export default Header;
