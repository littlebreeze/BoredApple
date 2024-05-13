'use client';

import { useGetAbilities } from '@/queries/get-abilities';
import MyAnalysis from './MyAnalysis';
import MyGraph from './MyGraph';
import MyStrength from './MyStrength';

export default function MyAbility() {
  const { data: abilities } = useGetAbilities();

  const ability: number[] = abilities?.data[0] ?? [];
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center flex-1 px-5 pb-5 bg-white rounded-2xl'>
        <div className='w-full py-3 font-bold text-ourDarkGray'>독해 핵심 능력</div>
        <div className='flex items-center justify-center w-52 h-52'>
          <MyGraph ability={ability} />
        </div>
        <MyAnalysis ability={ability} />
      </div>
      <div className='w-1/3 px-5 pb-5 bg-white rounded-2xl'>
        <div className='w-full py-3 font-bold text-ourDarkGray'>강점 & 약점</div>
        <MyStrength abilities={abilities?.data || [[]]} />
      </div>
    </div>
  );
}
