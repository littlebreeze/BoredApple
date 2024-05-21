import type { Metadata } from 'next';
import LearningBox from './_components/LearningBox';
import GameBox from './_components/GameBox';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지킴이',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 문해력 학습',
};

export default function Page() {
  return (
    <div className='min-w-[1000px] '>
      <div className=' h-screen '>
        <div className='py-4'></div>
        <div className='text-ourDarkGray pb-2 text-xl font-semibold'>오늘의 학습</div>
        <div className=' h-96'>
          <LearningBox />
        </div>
        <div className='py-8'></div>
        <div className=' text-ourDarkGray pb-2 text-xl font-semibold'>실시간 어휘 퀴즈 대결</div>
        <div className='h-52'>
          <GameBox />
        </div>
        <div className='py-4'></div>
      </div>
    </div>
  );
}
