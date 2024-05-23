import { create } from 'zustand';

type GameRoomInfo = {
  id: number;
  roomName: string;
  isSecret: boolean;
  roomPassword: string;
  nowNum: number;
  maxNum: number;
  isStarted: boolean;
  roomCreatorName: string;
  quizCount: number;
  isEndPage: boolean;
};

interface gameWaitState {
  isShow: boolean;
  setIsShow: (state: boolean) => void;
  clickedRoom: GameRoomInfo | null;
  setClickedRoom: (item: GameRoomInfo | null) => void;
  enteredRoom: GameRoomInfo | null;
  setEnteredRoom: (item: GameRoomInfo | null) => void;
  roomList: GameRoomInfo[];
  setRoomList: (list: GameRoomInfo[]) => void;
  isEndPage: boolean;
  setIsEndPage: (flag: boolean) => void;
  pageNum: number;
  setPageNum: (page: number) => void;
}

export const useGameWaitStore = create<gameWaitState>((set) => ({
  isShow: false,
  setIsShow: (state: boolean) => {
    set({ isShow: state });
  },
  clickedRoom: null,
  setClickedRoom: (item: GameRoomInfo | null) => {
    set({ clickedRoom: item });
  },
  enteredRoom: null,
  setEnteredRoom: (item: GameRoomInfo | null) => {
    set({ enteredRoom: item });
  },
  roomList: [],
  setRoomList: (list: GameRoomInfo[]) => {
    set({ roomList: list });
  },
  isEndPage: false,
  setIsEndPage: (flag: boolean) => {
    set({ isEndPage: flag });
  },
  // 페이지 시작번호 여기서 바꾸기
  pageNum: 1,
  setPageNum: (page: number) => {
    set({ pageNum: page });
  },
}));
