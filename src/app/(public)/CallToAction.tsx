'use client';

import SpringImage from '@/assets/spring.png';
import StarImage from '@/assets/star.png';
import PageLayout from '@/components/container/PageLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className='bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip'
    >
      <PageLayout>
        <div className='section-heading relative'>
          <h2 className='section-title'>Sign up for free today</h2>
          <p className='section-description mt-5'>
            Celebrate your creativity with an app designed to craft unique logos
            effortlessly and bring your brand to life.
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
        <div className='flex gap-2 mt-10 justify-center'>
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
