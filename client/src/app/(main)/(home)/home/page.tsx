import type { Metadata } from 'next';
import LearningBox from './_components/LearningBox';
import GameBox from './_components/GameBox';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 문해력 학습',
};

export default function Page() {
  return (
    <div className='min-w-[1000px]'>
      <div className=' h-screen '>
        <div className='py-2'></div>
        <div className=' text-ourDarkGray pb-1'>오늘의 학습</div>
        <div className='bg-blue-200 h-96'>
          <LearningBox />
        </div>
        <div className='py-2'></div>
        <div className=' text-ourDarkGray pb-1'>실시간 어휘 퀴즈 대결</div>
        <div className='bg-blue-200 h-52'>
          <GameBox />
        </div>
      </div>
    </div>
  );
}
