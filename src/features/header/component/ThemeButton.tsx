'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

function ThemeButton(): JSX.Element {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Toggle Theme'
      className='mr-6'
      onClick={(): void => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className='h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  );
}

export default ThemeButton;
