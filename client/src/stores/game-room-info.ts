import { create } from 'zustand';

type GameRoomDetail = {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes?: { userId: number; nickname: string }[];
};

type Score = {
  myNickname: string | undefined;
  myUserId: number | undefined;
  score: number;
};

interface GameRoomInfo {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[];
  setGameRoomInfo: (info: GameRoomDetail) => void;
}

export const useGameRoomStore = create<GameRoomInfo>((set) => ({
  myNickname: undefined,
  myUserId: undefined,
  roomId: undefined,
  maxNum: undefined,
  quizCount: undefined,
  creatorId: undefined,
  roomPlayerRes: [],
  setGameRoomInfo: (info: GameRoomDetail) => {
    set({
      ...info,
    });
  },
}));
