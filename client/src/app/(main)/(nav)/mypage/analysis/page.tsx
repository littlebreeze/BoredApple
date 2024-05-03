import type { Metadata } from 'next';
import MyGraph from '../_components/MyGraph';
import MyAnalysis from '../_components/MyAnalysis';
import MyStrength from '../_components/MyStrength';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import axios from 'axios';

export const metadata: Metadata = {
  title: '분석 보고서',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export interface IAbilities {
  data: number[][];
}

async function getAbilities() {
  try {
    const res = await axios.get<IAbilities>(`http://k10a508.p.ssafy.io:8087/ability`);
    console.log(res.data);
    return res.data || [];
  } catch (e) {
    console.log('분석 보고서 데이터 에러: ', e);
    return { data: [[]] };
  }
}

export default async function Analysis() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['ability'], queryFn: getAbilities });
  const dehydratedState = dehydrate(queryClient);

  const abilities: IAbilities | undefined = queryClient.getQueryData(['ability']);

  const ability: number[] = abilities?.data[0] ?? [];

  return (
    <div className='w-full'>
      <div className='flex flex-col '>
        <div className='text-lg text-ourBlack pt-5 pb-2'>종합 평가</div>
        <HydrationBoundary state={dehydratedState}>
          <div className='flex gap-4'>
            <div className='flex flex-col flex-1 items-center bg-white px-5 pb-5 rounded-2xl'>
              <div className='w-full text-ourDarkGray py-3 font-bold'>독해 핵심 능력</div>
              <div className='w-52 h-52 flex justify-center items-center'>
                <MyGraph ability={ability} />
              </div>
              <MyAnalysis ability={ability} />
            </div>
            <div className='bg-white rounded-2xl px-5 pb-5 w-1/3'>
              <div className='w-full text-ourDarkGray py-3 font-bold'>강점 & 약점</div>
              <MyStrength abilities={abilities?.data || [[]]} />
            </div>
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
}
