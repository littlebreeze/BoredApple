import { create } from 'zustand';

interface QuizStoreState {
  score: number;
  setScore: (data: number) => void;
  initScore: (data: number) => void;
}

const useQuizStore = create<QuizStoreState>((set) => ({
  score: 0,
  setScore: (data: number) => {
    set((state) => ({ score: state.score + data }));
  },
  initScore: (data: number) => {
    set({ score: 0 });
  },
}));

export default useQuizStore;
