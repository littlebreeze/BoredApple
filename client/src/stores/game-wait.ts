import { create } from 'zustand';

interface gameWaitState {
  setIsShow: (state: boolean) => void;
  isShow: boolean;
}

export const useGameWaitStore = create<gameWaitState>((set) => ({
  setIsShow: (state: boolean) => {
    set({ isShow: state });
  },
  isShow: false,
}));
