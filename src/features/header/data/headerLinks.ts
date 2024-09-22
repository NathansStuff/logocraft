import { HeaderLink } from '@/features/header/types/HeaderLink';

export const publicheaderLinks: HeaderLink[] = [
  {
    title: 'About',
    href: '#',
  },
  {
    title: 'Products',
    href: '/products',
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
