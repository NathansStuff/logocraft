'use client';

import { pricingTiers } from '@/data/pricingTiers';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function Pricing() {
  return (
    <section className='py-24'>
      <div className='container'>
        <div className='section-heading'>
          <h2 className='section-title'>Pricing</h2>
          <p className='section-description mt-5'>
            Free forever. Upgrade for unlimited tasks, better security and
            exclusive features.
          </p>
        </div>
        <div className='flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center'>
          {pricingTiers.map((tier, index) => {
            const {
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            } = tier;
            return (
              <div
                key={index}
                className={twMerge(
                  'card',
                  inverse && 'border-black bg-black text-white'
                )}
              >
                <div className='flex justify-between'>
                  <h3
                    className={twMerge(
                      'text-lg font-bold text-black/50',
                      inverse && 'text-white/60'
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div className='inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20'>
                      <motion.span
                        className='bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium'
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
                <div className='flex items-baseline gap-1 mt-[30px]'>
                  <span className='text-4xl font-bold tracking-tighter leading-none'>
                    ${monthlyPrice}
                  </span>
                  <span className='tracking-tight font-bold text-black/50'>
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    'btn btn-primary w-full mt-[30px]',
                    inverse && 'bg-white text-black'
                  )}
                >
                  {buttonText}
                </button>
                <ul className='flex flex-col gap-5 mt-8'>
                  {features.map((feature, index) => {
                    return (
                      <li
                        key={index}
                        className='text-sm flex items-center gap-4'
                      >
                        <CheckIcon className='size-6' />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
