'use client';

import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import PageLayout from '@/components/container/PageLayout';
import { pricingTiers } from '@/data/pricingTiers';

function Pricing(): ReactNode {
  return (
    <section className='py-24'>
      <PageLayout>
        <div className='section-heading'>
          <h2 className='section-title'>Pricing</h2>
          <p className='section-description mt-5'>
            Free forever. Upgrade for unlimited downloads, high quality images and exclusive features.
          </p>
        </div>
        <div className='mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center'>
          {pricingTiers.map((tier, index) => {
            const { title, monthlyPrice, buttonText, popular, inverse, features } = tier;
            return (
              <div
                key={index}
                className={twMerge(
                  'card flex h-full flex-col border-white bg-white',
                  inverse && 'border-black bg-black text-white'
                )}
              >
                <div className='flex h-[33px] justify-between'>
                  <h3 className={twMerge('text-lg font-bold text-black/50', inverse && 'text-white/60')}>{title}</h3>
                  {popular && (
                    <div className='inline-flex rounded-xl border border-white/20 px-4 py-1.5 text-sm'>
                      <motion.span
                        className='bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] bg-clip-text font-medium text-transparent [background-size:200%]'
                        animate={{
                          backgroundPositionX: '-100%',
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                          repeatType: 'loop',
                        }}
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className='mt-1 flex items-baseline gap-1'>
                  <span className='text-4xl font-bold leading-none tracking-tighter'>${monthlyPrice}</span>
                  <span className={twMerge('font-bold tracking-tight text-black/50', inverse && 'text-white/50')}>
                    /month
                  </span>
                </div>
                <button className={twMerge('btn btn-primary mt-[30px] w-full', inverse && 'bg-white text-black')}>
                  {buttonText}
                </button>
                <ul className='mt-8 flex flex-col justify-start gap-3'>
                  {features.map((feature, index) => {
                    return (
                      <li
                        key={index}
                        className='flex items-center gap-2 text-sm'
                      >
                        <CheckIcon className='size-4' />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </PageLayout>
    </section>
  );
}

export default Pricing;
