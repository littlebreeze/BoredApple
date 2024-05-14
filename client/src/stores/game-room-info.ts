import { create } from 'zustand';

type GameRoomDetail = {
  roomName: string | undefined;
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
  roomName: string | undefined;
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[];
  setGameRoomInfo: (info: GameRoomDetail) => void;
  setCreatorId: (userId: number) => void;
  clearGameRoomInfo: () => void;
  resultModalIsShow: boolean;
  setResultModalIsShow: (state: boolean) => void;
}

export const useGameRoomStore = create<GameRoomInfo>((set) => ({
  roomName: undefined,
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

  setCreatorId: (userId: number) => {
    set({ creatorId: userId });
  },

  clearGameRoomInfo: () => {
    set({
      myNickname: undefined,
      myUserId: undefined,
      roomId: undefined,
      maxNum: undefined,
      quizCount: undefined,
      creatorId: undefined,
      roomPlayerRes: [],
    });
  },
  resultModalIsShow: false,
  setResultModalIsShow: (state: boolean) => set({ resultModalIsShow: state }),
}));
