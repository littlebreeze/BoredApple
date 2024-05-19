import { create } from 'zustand';

interface LabelState {
  activeLabel: string;
  setActiveLabel: (label: string) => void;
}

export const useLabelStore = create<LabelState>((set) => ({
  activeLabel: '사실적읽기',
  setActiveLabel: (label: string) => set({ activeLabel: label }),
}));
