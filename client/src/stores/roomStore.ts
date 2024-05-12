import { IRoomInfo } from '@/types/Room';
import { create } from 'zustand';

interface RoomState {
  rooms: { [key: string]: IRoomInfo };
  addRoom: (room: IRoomInfo) => void;
  getRoomById: (roomId: string) => IRoomInfo | undefined;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  rooms: {},

  addRoom: (room: IRoomInfo) =>
    set((state) => ({
      rooms: {
        ...state.rooms,
        [room.roomId]: room,
      },
    })),

  getRoomById: (roomId: string) => {
    return get().rooms[roomId];
  },
}));
