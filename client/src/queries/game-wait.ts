import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

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

type GRResponse = {
  data: GameRoomInfo[];
};

// async - await 함수 작성
const getGameRoomList = async (pageNum: number) => {
  const response = await axios.get<GRResponse>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/rooms/${pageNum}`);
  return response;
};

// useQuery 리턴하는 Hook
export const useGameRoomList = (pageNum: number) => {
  return useQuery({ queryKey: ['getGameRoomList', pageNum], queryFn: () => getGameRoomList(pageNum) });
};
