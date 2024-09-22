import { ReactNode } from 'react';

import { Instagram, Linkedin, Pin, X, Youtube } from 'lucide-react';
import Image from 'next/image';

import Logo from '@/assets/logosaas.png';
import PageLayout from '@/components/container/PageLayout';

function Footer(): ReactNode {
  return (
    <footer className='bg-black py-10 text-center text-sm text-[#BCBCBC]'>
      <PageLayout>
        <div className='relative inline-flex before:absolute before:bottom-0 before:h-full before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:blur before:content-[""]'>
          <Image
            src={Logo}
            height={40}
            width={40}
            alt='logo'
            className='relative'
          />
        </div>
        <nav className='mt-6 flex flex-col justify-center gap-6 md:flex-row'>
          <a href='#'>About</a>
          <a href='#'>Features</a>
          <a href='#'>Customers</a>
          <a href='#'>Pricing</a>
          <a href='#'>Help</a>
          <a href='#'>Careers</a>
        </nav>
        <div className='my-6 flex justify-center gap-6'>
          <X className='size-6' />
          <Instagram className='size-6' />
          <Linkedin className='size-6' />
          <Pin className='size-6' />
          <Youtube className='size-6' />
        </div>
        <p className='mt-6'>&copy; 2024 Your Company, Inc. All rights reserved.</p>
      </PageLayout>
    </footer>
  );
}

export default Footer;
