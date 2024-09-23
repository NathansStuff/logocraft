import { HeaderLink } from '@/features/header/types/HeaderLink';

export const publicheaderLinks: HeaderLink[] = [
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'Credits',
    href: '/credits',
  },
  {
    title: 'Subscriptions',
    href: '/subscriptions',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const privateheaderLinks: HeaderLink[] = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Guestbook',
    href: '/guestbook',
  },
];
