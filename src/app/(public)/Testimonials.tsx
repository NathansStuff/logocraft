'use client';

import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import PageLayout from '@/components/container/PageLayout';
import { testimonialData } from '@/data/testimonialsData';

function Testimonials(): ReactNode {
  const firstColumn = testimonialData.slice(0, 3);
  const secondColumn = testimonialData.slice(3, 6);
  const thirdColumn = testimonialData.slice(6, 9);

  return (
    <section className='bg-white pt-5'>
      <PageLayout>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Testimonials</div>
          </div>
          <h2 className='section-title mt-5'>What Our Users Are Crafting</h2>
          <p className='section-description mt-5'>
            From effortless customization to stunning designs, our logo crafter app has become an invaluable tool for
            creators and businesses worldwide.
          </p>
        </div>
        <div className='mt-10 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]'>
          <TestimonialsColumns
            testimonials={firstColumn}
            duration={15}
          />
          <TestimonialsColumns
            testimonials={secondColumn}
            className='hidden md:block'
            duration={19}
          />
          <TestimonialsColumns
            testimonials={thirdColumn}
            className='hidden lg:block'
            duration={17}
          />
        </div>
      </PageLayout>
    </section>
  );
}

export default Testimonials;

type Props = {
  testimonials: typeof testimonialData;
  className?: string;
  duration?: number;
};

function TestimonialsColumns({ testimonials, className, duration }: Props): ReactNode {
  return (
    <div className={className}>
      <motion.div
        className='flex -translate-y-1/2 flex-col gap-6 pb-6'
        animate={{ translateY: '-50%' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
          duration: duration || 10,
        }}
      >
        {[...new Array(2)].fill(0).map((_, i) => (
          <React.Fragment key={i}>
            {testimonials.map((testimonial, i) => {
              const { name, text, username, imageSrc } = testimonial;
              return (
                <div
                  key={i}
                  className='card'
                >
                  <div>{text}</div>
                  <div className='mt-5 flex items-center gap-2'>
                    <Image
                      src={imageSrc}
                      alt={name}
                      height={40}
                      width={40}
                      className='h-10 w-10 rounded-full'
                    />
                    <div className='flex flex-col'>
                      <div className='font-medium leading-5 tracking-tight'>{name}</div>
                      <div className='leading-5 tracking-tighter'>{username}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
