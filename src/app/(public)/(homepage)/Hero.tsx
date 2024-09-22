'use client';

import { ReactNode, useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import CogImage from '@/assets/cog.png';
import CylinderImage from '@/assets/cylinder.png';
import NoodleImage from '@/assets/noodle.png';
import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';

function Hero(): ReactNode {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={heroRef}
      className='overflow-x-clip bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183Ec2,#EAEEFE_100%)] pb-20 pt-8'
    >
      <PageLayout>
        <div className='items-center md:flex'>
          <div className='md:w-[478px]'>
            <div className='tag'>Version 2.0 is here</div>
            <h1 className='mt-6 bg-gradient-to-b from-black to-[#001E80] bg-clip-text text-5xl font-bold tracking-tighter text-transparent'>
              Create Stunning Logos in Minutes
            </h1>
            <p className='mt-6 text-xl tracking-tight text-[#010D3E]'>
              Unleash your creativity with our intuitive logo crafter. Customize shapes, colors, and styles to design
              the perfect logo for your brand.
            </p>
            <div className='mt-[30px] flex items-center gap-1'>
              <Button className=''>Get for free</Button>
              <Button
                variant='ghost'
                className='btn btn-text gap-1'
              >
                <span>Learn more</span>
                <ArrowRight className='size-4' />
              </Button>
            </div>
          </div>
          <div className='relative mt-20 md:mt-0 md:h-[648px] md:flex-1'>
            <motion.img
              src={CogImage.src}
              alt='cog image'
              className='md:absolute md:-left-6 md:h-full md:w-auto md:max-w-none lg:left-0'
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3,
                ease: 'easeInOut',
              }}
            />
            <motion.img
              src={CylinderImage.src}
              width={220}
              height={220}
              alt='cylinder '
              className='-left-32 -top-8 hidden md:absolute md:block'
              style={{
                translateY,
              }}
            />
            <motion.img
              src={NoodleImage.src}
              width={220}
              alt='noodle'
              className='absolute left-[448px] top-[564px] hidden rotate-[30deg] xl:block 2xl:left-[548px]'
              style={{
                rotate: 30,
                translateY,
              }}
            />
          </div>
        </div>
      </PageLayout>
    </section>
  );
}

export default Hero;
