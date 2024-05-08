import { create } from 'zustand';
import { Room } from '@/types/Room';

interface ModalState {
  data: Room | null;
  setData(data: Room): void;
  reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({
  data: null,
  setData(data) {
    set({ data });
  },
  reset() {
    set({ data: null });
  },
}));
