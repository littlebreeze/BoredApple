import type { Metadata } from 'next';

import AttendanceRecord from './_components/AttendanceRecord';
import StudyRecord from './_components/StudyRecord';
import GameRecord from './_components/GameRecord';
import MonthlyRecord from './_components/MonthlyRecord';

export const metadata: Metadata = {
  title: '학습 일지',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row lg:flex-row gap-4 px-4 md:px-0 lg:px-0 pb-10'>
      <div className='w-full md:w-2/3 lg:w-2/3'>
        <div className='text-lg text-ourBlack pt-5 pb-2'>월별 학습 기록</div>
        <div className='flex gap-4 bg-white rounded-2xl'>
          <MonthlyRecord />
        </div>
      </div>
      <div className='w-full md:w-1/3 lg:w-1/3'>
        <div className='text-lg text-ourBlack pt-5 pb-2 opacity-0'>&nbsp;</div>
        <div className='flex flex-col gap-4'>
          <div className='bg-white rounded-2xl p-5'>
            <AttendanceRecord />
          </div>
          <div className='bg-white rounded-2xl p-5'>
            <StudyRecord />
          </div>
          <div className='bg-white rounded-2xl p-5 '>
            <GameRecord />
          </div>
        </div>
      </div>
    </div>
  );
}
