import { create } from 'zustand';

type GameRoomDetail = {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[] | null;
};

interface gameRoomInfo {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[] | null;
  setGameRoomInfo: (info: GameRoomDetail) => void;
}

export const useGameRoomStore = create<gameRoomInfo>((set) => ({
  myNickname: undefined,
  myUserId: undefined,
  roomId: undefined,
  maxNum: undefined,
  quizCount: undefined,
  creatorId: undefined,
  roomPlayerRes: null,
  setGameRoomInfo: (info: GameRoomDetail) => {
    set({
      ...info,
    });
  },
}));
