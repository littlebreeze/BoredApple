import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import instance from '@/utils/interceptor';

type GameRoomDetail = {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[];
};

const getGameRoomInfo = (roomId: number | undefined) => {
  const response = instance.get<{ data: GameRoomDetail }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/game-service/players`,
    {
      params: {
        roomId: roomId, // roomId를 요청에 포함시킵니다.
      },
    }
  );
  return response;
};

// useQuery 리턴하는 Hook
export const useGameRoomInfo = (roomId: number | undefined) => {
  return useQuery({ queryKey: ['getGameRoomList', roomId], queryFn: () => getGameRoomInfo(roomId) });
};
