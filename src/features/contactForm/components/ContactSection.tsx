import React from 'react';

import Link from 'next/link';

function ContactSection(): React.JSX.Element {
  return (
    <div className='flex-center w-full'>
      <div className='mx-auto w-full max-w-7xl px-4 pt-8 text-left'>
        <div className='px-8'>
          <h1 className='mb-4 text-center text-3xl font-bold'>Contact Us</h1>
          <div className='space-y-6'>
            <section>
              <p>
                Welcome to our Contact Page! Whether you have questions, feedback, or suggestions, we&rsquo;re here to
                listen. Fill out the form below, and we&rsquo;ll get back to you as soon as possible.
                <br />
                <br /> For immediate assistance, please check our{' '}
                <Link
                  className='underline'
                  href='/'
                >
                  FAQs
                </Link>
                . If you can&rsquo;t find what you&rsquo;re looking for, please proceed with your message below.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
