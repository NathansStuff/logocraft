'use client';

import PageLayout from '@/components/container/PageLayout';
import { testimonialData } from '@/data/testimonialsData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

function Testimonials() {
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
            From effortless customization to stunning designs, our logo crafter
            app has become an invaluable tool for creators and businesses
            worldwide.
          </p>
        </div>
        <div className='flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 max-h-[738px] overflow-hidden'>
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

function TestimonialsColumns({ testimonials, className, duration }: Props) {
  return (
    <div className={className}>
      <motion.div
        className='-translate-y-1/2 pb-6 flex flex-col gap-6'
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
                  <div className='flex items-center gap-2 mt-5'>
                    <Image
                      src={imageSrc}
                      alt={name}
                      height={40}
                      width={40}
                      className='h-10 w-10 rounded-full'
                    />
                    <div className='flex flex-col'>
                      <div className='font-medium tracking-tight leading-5'>
                        {name}
                      </div>
                      <div className='tracking-tighter leading-5'>
                        {username}
                      </div>
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
