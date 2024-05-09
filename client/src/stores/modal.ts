import { create } from 'zustand';
import { IRoom } from '@/types/Room';

interface ModalState {
  data: IRoom | null;
  setData(data: IRoom): void;
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
