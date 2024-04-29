import create from 'zustand';

interface QuizStoreState {
  correctQuiz: number;
  setCorrectQuiz: (data: number) => void;
}

const useQuizStore = create<QuizStoreState>((set) => ({
  correctQuiz: 0,
  setCorrectQuiz: (data: number) => {
    set({ correctQuiz: data });
  },
}));

export default useQuizStore;
