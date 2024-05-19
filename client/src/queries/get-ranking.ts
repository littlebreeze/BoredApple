import { IRankings } from '@/types/Ranking';
import instance from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';

async function getRanking() {
  try {
    const res = await instance.get<{ data: IRankings }>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/rankings`);
    return res.data.data || null;
  } catch (e) {
    // console.log('랭킹 조회 에러', e);
    return null;
  }
}

export const useGetRanking = () => {
  const { data, isLoading } = useQuery({ queryKey: ['ranking'], queryFn: getRanking });

  return { data, isLoading };
};
