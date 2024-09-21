import { create } from 'zustand';

import { SheetState } from '@/types/SheetState';

export const useMobileNavigation = create<SheetState>((set) => ({
  isOpen: false,
  onOpen: (): void => set({ isOpen: true }),
  onClose: (): void => set({ isOpen: false }),
}));
