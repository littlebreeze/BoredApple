import { create } from 'zustand';

type MemberScore = {
  score: number;
  nickname: string;
  id: number;
};

interface GameScore {
  players: MemberScore[];
  addPlayers: (player: MemberScore[]) => void;
}

export const useGameScoreStore = create<GameScore>((set) => ({
  players: [],
  addPlayers: (players: MemberScore[]) => {
    set({ players: players });
  },
}));
