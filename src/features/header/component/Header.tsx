'use client';

import Logo from '@/assets/logosaas.png';
import { Button } from '@/components/ui/button';
import { ArrowRight, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import ThemeButton from './ThemeButton';

function Header() {
  const { onOpen } = useMobileNavigation();

  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
      <div className='flex justify-center items-center py-3 bg-white text-black dark:bg-black dark:text-white text-sm gap-3'>
        <p className='text-black/60 dark:text-white/60 hidden md:block'>
          Streamline your workflow and boost your productivity
        </p>
        <div className='inline-flex gap-1 items-center'>
          <p>Get started for free</p>
          <ArrowRight className='w-4 h-4 inline-flex justify-center items-center' />
        </div>
      </div>
      <div className='py-5'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <Image
              src={Logo.src}
              alt='logo'
              height={40}
              width={40}
            />
            <MenuIcon className='size-5 md:hidden text-black dark:text-white' />
            <nav className='hidden md:flex gap-6 text-black/60 dark:text-white/60 items-center'>
              <a href='#'>About</a>
              <a href='#'>Features</a>
              <a href='#'>Customers</a>
              <a href='#'>Updates</a>
              <a href='#'>Help</a>
              <button className='btn btn-primary'>Get for free</button>
            </nav>
            <div className='flex items-end'>
              <ThemeButton />
            </div>
            <Button onClick={onOpen}>click me</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
