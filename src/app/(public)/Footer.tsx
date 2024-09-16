import Logo from '@/assets/logosaas.png';
import PageLayout from '@/components/container/PageLayout';
import { Instagram, Linkedin, Pin, X, Youtube } from 'lucide-react';

import Image from 'next/image';

function Footer() {
  return (
    <footer className='bg-black text-[#BCBCBC] text-sm py-10 text-center'>
      <PageLayout>
        <div className='inline-flex relative before:content-[""] before:h-full before:blur before:bottom-0 before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute'>
          <Image
            src={Logo}
            height={40}
            width={40}
            alt='logo'
            className='relative'
          />
        </div>
        <nav className='flex flex-col md:flex-row justify-center gap-6 mt-6'>
          <a href='#'>About</a>
          <a href='#'>Features</a>
          <a href='#'>Customers</a>
          <a href='#'>Pricing</a>
          <a href='#'>Help</a>
          <a href='#'>Careers</a>
        </nav>
        <div className='flex justify-center gap-6 my-6'>
          <X className='size-6' />
          <Instagram className='size-6' />
          <Linkedin className='size-6' />
          <Pin className='size-6' />
          <Youtube className='size-6' />
        </div>
        <p className='mt-6'>
          &copy; 2024 Your Company, Inc. All rights reserved.
        </p>
      </PageLayout>
    </footer>
  );
}

export default Footer;
