import { ReactNode } from 'react';

import { Metadata } from 'next';

import VerifedOnly from '@/components/container/VerifiedOnly';

import ProfileCard from './ProfileCard';

export const metadata: Metadata = {
  title: 'Contact Us - UltimateVanGuide.com',
  description: 'Contact UltimateVanGuide.com with questions, comments, or suggestions.',
  alternates: {
    canonical: '/contact',
  },
};

function ProfilePage(): ReactNode {
  return (
    <>
      <VerifedOnly />
      <ProfileCard />
    </>
  );
}

export default ProfilePage;
