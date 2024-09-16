'use client';

import CogImage from '@/assets/cog.png';
import CylinderImage from '@/assets/cylinder.png';
import NoodleImage from '@/assets/noodle.png';
import PageLayout from '@/components/container/PageLayout';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={heroRef}
      className='pt-8 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183Ec2,#EAEEFE_100%)] overflow-x-clip'
    >
      <PageLayout>
        <div className='md:flex items-center'>
          <div className='md:w-[478px]'>
            <div className='tag'>Version 2.0 is here</div>
            <h1 className='text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6'>
              Create Stunning Logos in Minutes
            </h1>
            <p className='text-xl text-[#010D3E] tracking-tight mt-6'>
              Unleash your creativity with our intuitive logo crafter. Customize
              shapes, colors, and styles to design the perfect logo for your
              brand.
            </p>
            <div className='flex gap-1 items-center mt-[30px]'>
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
          <div className='mt-20 md:mt-0 md:h-[648px] md:flex-1 relative'>
            <motion.img
              src={CogImage.src}
              alt='cog image'
              className='md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0'
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
              className='hidden md:block -top-8 -left-32 md:absolute'
              style={{
                translateY,
              }}
            />
            <motion.img
              src={NoodleImage.src}
              width={220}
              alt='noodle'
              className='hidden lg:block top-[564px] left-[448px] absolute rotate-[30deg]'
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
