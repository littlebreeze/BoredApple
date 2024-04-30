import { create } from 'zustand';

interface LabelState {
  activeLabel: string;
  setActiveLabel: (label: string) => void;

  scores: number[];
  setScores: (newScore: number[]) => void;
}

export const useLabelStore = create<LabelState>((set) => ({
  activeLabel: '사실적읽기',
  setActiveLabel: (label: string) => set({ activeLabel: label }),

  scores: [10, 10, 10, 10, 10],
  setScores: (newScore: number[]) => set({ scores: newScore }),
}));
