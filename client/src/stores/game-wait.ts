import { create } from 'zustand';

interface gameWaitState {
  isShow: boolean;
  setIsShow: (state: boolean) => void;
  selectedRoomId: number;
  setSelectedRoomId: (id: number) => void;
  selectedRoomTitle: string;
  setSelectedRoomTitle: (title: string) => void;
  // 게임방 아이디, 게임방 이름
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
}));
