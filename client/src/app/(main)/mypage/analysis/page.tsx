import type { Metadata } from 'next';
import MyGraph from '../_component/MyGraph';
import MyAnalysis from '../_component/MyAnalysis';
import MyStrength from '../_component/MyStrength';

export const metadata: Metadata = {
  title: '분석 보고서',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default function Analysis() {
  return (
    <div className='w-full'>
      <div className='flex flex-col '>
        <div className='text-lg text-ourBlack pt-5 pb-2'>종합 평가</div>
        <div className='flex gap-4'>
          <div className='flex flex-col flex-1 items-center bg-white px-5 pb-5 rounded-2xl'>
            <div className='w-full text-ourDarkGray py-3 font-bold'>독해 핵심 능력</div>
            <div className='w-52 h-52 flex justify-center items-center'>
              <MyGraph />
            </div>
            <MyAnalysis />
          </div>
          <div className='bg-white rounded-2xl px-5 pb-5 w-1/3'>
            <div className='w-full text-ourDarkGray py-3 font-bold'>강점 & 약점</div>
            <MyStrength />
          </div>
        </div>
      </div>
    </div>
  );
}
