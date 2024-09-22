'use client';

import { ReactNode, useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import SpringImage from '@/assets/spring.png';
import StarImage from '@/assets/star.png';
import PageLayout from '@/components/container/PageLayout';

function CallToAction(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className='overflow-x-clip bg-sky-700 bg-gradient-to-b from-white to-[#D2DCFF] px-4 py-24 text-white'
    >
      <PageLayout>
        <div className='section-heading relative'>
          <h2 className='section-title'>Sign up for free today</h2>
          <p className='section-description mt-5'>
            Celebrate your creativity with an app designed to craft unique logos effortlessly and bring your brand to
            life.
          </p>
          <motion.img
            src={StarImage.src}
            alt={'Star'}
            width={360}
            className='absolute -left-[350px] -top-[137px]'
            style={{
              translateY,
            }}
          />
          <motion.img
            src={SpringImage.src}
            alt={'Star'}
            width={360}
            className='absolute -right-[331px] -top-[19px]'
            style={{
              translateY,
            }}
          />
        </div>
        <div className='mt-10 flex justify-center gap-2'>
          <button className='btn btn-primary'>Get for free</button>
          <button className='btn btn-text'>
            <span>Learn more</span>
            <ArrowRight className='size-5' />
          </button>
        </div>
      </PageLayout>
    </section>
  );
}

export default CallToAction;
