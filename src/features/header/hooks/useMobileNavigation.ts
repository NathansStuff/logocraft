import { SheetState } from '@/types/SheetState';
import { create } from 'zustand';

export const useMobileNavigation = create<SheetState>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
