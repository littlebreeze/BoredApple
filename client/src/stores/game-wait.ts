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
  selectedRoomId: number;
  setSelectedRoomId: (id: number) => void;
  selectedRoomTitle: string;
  setSelectedRoomTitle: (title: string) => void;
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
  selectedRoomId: -1,
  setSelectedRoomId: (id: number) => {
    set({ selectedRoomId: id });
  },
  selectedRoomTitle: '제목없음',
  setSelectedRoomTitle: (title: string) => {
    set({ selectedRoomTitle: title });
  },
  roomList: [],
  setRoomList: (list: GameRoomInfo[]) => {
    set({ roomList: list });
  },
  // 페이지 시작번호 여기서 바꾸기
  pageNum: 5,
  setPageNum: (page: number) => {
    set({ pageNum: page });
  },
}));
