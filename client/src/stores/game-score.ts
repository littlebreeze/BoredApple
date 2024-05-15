import { create } from 'zustand';

type MemberScore = {
  score: number;
  nickname: string;
  id: number;
};

interface GameScore {
  players: MemberScore[];
  setPlayers: (player: MemberScore[]) => void;
  addPlayers: (player: MemberScore) => void;
  exitPlayer: (playerId: number) => void;
  getScore: (playerId: number) => void;
  clearScore: () => void;
}

export const useGameScoreStore = create<GameScore>((set, get) => ({
  players: [],
  setPlayers: (players: MemberScore[]) => {
    set({ players: players });
  },
  addPlayers: (players: MemberScore) => {
    let prev = get().players;
    prev.push(players);
    set({ players: prev });
  },
  exitPlayer: (playerId: number) => {
    let filtered = get().players;
    filtered = filtered.filter((player) => player.id != playerId);
    set({ players: filtered });
  },
  getScore: (playerId: number) => {
    let filtered = get().players;
    filtered = filtered.map((player) => {
      if (Number(player.id) === Number(playerId)) {
        return { ...player, score: player.score + 1 };
      } else return player;
    });
    set({ players: filtered });
  },
  clearScore: () => {
    let filtered = get().players;
    filtered = filtered.map((player) => ({ ...player, score: 0 }));
    set({ players: filtered });
  },
}));
