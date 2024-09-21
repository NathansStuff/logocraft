import { create } from 'zustand';

import { SheetState } from '@/types/SheetState';

export const useMobileNavigation = create<SheetState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
