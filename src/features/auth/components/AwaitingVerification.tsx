import React from 'react';

import Link from 'next/link';

export default function SignupSuccessPage(): React.JSX.Element {
  return (
    <main className='flex w-full items-center justify-center p-8'>
      <div className='max-w-lg text-center'>
        <h1 className='pb-8 pt-20 text-3xl font-bold lg:text-4xl'>Signup Success</h1>
        <section className='text-concrete text-md pb-10 text-left'>
          <p>We&apos;ve sent you a verification email to complete your signup process.</p>
          <p className='mt-4'>
            Didn&apos;t receive the email? Check your junk folder, or request another verification link using the button
            below.
          </p>
          <p className='mt-4'>You can close this window if you&apos;re done.</p>
        </section>
        <footer className='mt-6 flex justify-center'>
          <Link
            href='/resend-verification-email'
            className='text-link'
          >
            Resend Verification Email
          </Link>
        </footer>
      </div>
    </main>
  );
}
