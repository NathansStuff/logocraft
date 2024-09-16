'use client';

import Logo from '@/assets/logosaas.png';
import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';
import { headerLinks } from '@/features/header/data/headerLinks';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import Banner from './Banner';

function Header() {
  const { onOpen } = useMobileNavigation();
  const isLoggedIn = true; //todo

  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
      <Banner />
      <PageLayout>
        <div className='flex items-center justify-between'>
          {/* Left: Logo */}
          <div className='flex items-center'>
            <Image
              src={Logo.src}
              alt='logo'
              height={40}
              width={40}
            />
          </div>

          {/* Middle: Navigation Links */}
          <nav className='hidden md:flex flex-1 justify-center'>
            <div className='flex gap-6 items-center'>
              {headerLinks.map((link, index) => (
                <Link
                  href={link.href}
                  key={index}
                  className='hover:text-primary/60 transition-colors duration-200'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Get Started Button + Theme Button */}
          <div className='hidden md:flex items-end gap-4'>
            <Button
              asChild
              className='btn btn-primary'
            >
              <Link
                href={isLoggedIn ? '/app' : '/signup'}
                passHref
              >
                {isLoggedIn ? 'Create Now' : 'Get Started for free'}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Icon */}
          <MenuIcon
            className='size-5 md:hidden text-primary cursor-pointer hover:text-primary/60 transition-colors duration-200'
            onClick={onOpen}
          />
        </div>
      </PageLayout>
    </header>
  );
}

export default Header;
