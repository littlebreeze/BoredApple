import { create } from 'zustand';

interface SoundState {
  isPlaying: boolean;
  setIsPlaying: (tmp: boolean) => void;

  isWaitingPage: boolean;
  setIsWaitingPage: (tmp: boolean) => void;
}

export const useSoundControlStore = create<SoundState>((set, get) => ({
  isPlaying: true,
  setIsPlaying: (tmp: boolean) => set({ isPlaying: tmp }),

  isWaitingPage: false,
  setIsWaitingPage: (tmp: boolean) => set({ isWaitingPage: tmp }),
}));
