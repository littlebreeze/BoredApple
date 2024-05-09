import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

type GResponse = {
  data: {
    numberOfWin: number;
    numberOfGame: number;
    rating: number;
    rank: number;
  };
};

// async - await 함수 작성
const getGameRecord = async () => {
  const response = await axios.get<GResponse>(`${process.env.NEXT_PUBLIC_API_SERVER}/user-service/record`);
  return response;
};

// useQuery 리턴하는 Hook
export const useGameRecord = () => {
  return useQuery({ queryKey: ['getGameRecord'], queryFn: getGameRecord });
};
