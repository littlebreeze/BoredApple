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
  selectedRoom: GameRoomInfo | null;
  setSelectedRoom: (item: GameRoomInfo | null) => void;
  roomList: GameRoomInfo[];
  setRoomList: (list: GameRoomInfo[]) => void;
  pageNum: number;
  setPageNum: (page: number) => void;
}

export const useGameWaitStore = create<gameWaitState>((set) => ({
  isShow: false,
  setIsShow: (state: boolean) => {
    set({ isShow: state });
  },
  selectedRoom: null,
  setSelectedRoom: (item: GameRoomInfo | null) => {
    set({ selectedRoom: item });
  },
  roomList: [],
  setRoomList: (list: GameRoomInfo[]) => {
    set({ roomList: list });
  },
  // 페이지 시작번호 여기서 바꾸기
  pageNum: 1,
  setPageNum: (page: number) => {
    set({ pageNum: page });
  },
}));
