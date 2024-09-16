'use client';

import ProductImage from '@/assets/product-image.png';
import PyramidImage from '@/assets/pyramid.png';
import TubeImage from '@/assets/tube.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className='bg-gradient-to-b from-[#fff] to-[#d2dcff] overflow-x-clip'
    >
      <div className='container'>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Craft with Ease</div>
          </div>
          <h2 className='section-title mt-5'>
            Your Ultimate Logo Creation Tool
          </h2>
          <p className='section-description mt-5'>
            Effortlessly design and customize your logo in minutes. Choose
            shapes, colors, and styles to create a unique logo that represents
            your brand.
          </p>
        </div>
        <div className='relative'>
          <Image
            src={ProductImage}
            alt='Product'
            className='mt-10'
          />
          <motion.img
            src={PyramidImage.src}
            alt='Pyramid'
            className='hidden md:block absolute -right-36 -top-32'
            height={262}
            width={262}
            style={{
              translateY,
            }}
          />
          <motion.img
            src={TubeImage.src}
            alt='Tube'
            className='hidden md:block absolute bottom-24 -left-36'
            height={248}
            width={248}
            style={{
              translateY,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
