import instance from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';

type IAbilities = {
  data: number[][];
};

async function getAbilities() {
  try {
    const res = await instance.get<IAbilities>(`${process.env.NEXT_PUBLIC_API_SERVER}/user-service/ability`);
    return res.data;
  } catch (e) {
    // console.log('분석 보고서 데이터 조회 에러: ', e);
    return null;
  }
}

export const useGetAbilities = () => {
  const { data, isLoading } = useQuery({ queryKey: ['abilities'], queryFn: getAbilities });

  return { data, isLoading };
};
