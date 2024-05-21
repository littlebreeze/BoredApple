import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import instance from '@/utils/interceptor';
import { useGameWaitStore } from '@/stores/game-wait';

type GameRoomDetail = {
  roomName: string | undefined;
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[];
};

const getGameRoomInfo = async (roomId: number | undefined) => {
  const response = await instance
    .get<{ data: GameRoomDetail }>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/players`, {
      params: {
        roomId: roomId, // roomId를 요청에 포함시킵니다.
      },
    })
    .catch();
  return response;
};

// useQuery 리턴하는 Hook
export const useGameRoomInfo = (roomId: number | undefined) => {
  return useQuery({
    queryKey: ['getGameRoomList', roomId],
    queryFn: () => {
      if (roomId) return getGameRoomInfo(roomId);
      else return Promise.resolve(null);
    },
  });
};
