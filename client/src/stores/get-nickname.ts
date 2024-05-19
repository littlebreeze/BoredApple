import instance from '@/utils/interceptor';
import { useQuery } from '@tanstack/react-query';

async function getNickname() {
  try {
    const res = await instance.get<string>(`${process.env.NEXT_PUBLIC_API_SERVER}/user-service/nickname`);
    return res.data;
  } catch (e) {
    // console.log('닉네임 조회 에러: ', e);
    return null;
  }
}

export const useGetNickname = () => {
  const { data, isLoading } = useQuery({ queryKey: ['nickname'], queryFn: getNickname });

  return { data, isLoading };
};
