'use client';

import CalendarComponent from './CalendarComponent';
import RecordList from './RecordList';

export default function MonthlyRecord() {
  return (
    <div className='flex flex-col p-5 w-full'>
      <div className='flex justify-center'>
        <div>
          <CalendarComponent />
          <div className='flex gap-3 mt-4 ml-3 justify-end'>
            <div className='flex flex-row-reverse items-center gap-1'>
              <div className='h-[10px] w-[10px] rounded-full bg-ourBlue'></div>
              <div className='text-sm text-ourDarkGray'>모두 완료</div>
            </div>
            <div className='flex flex-row-reverse items-center gap-1'>
              <div className='h-[10px] w-[10px] rounded-full bg-ourBlue/50'></div>
              <div className='text-sm text-ourDarkGray'>2개</div>
            </div>
            <div className='flex flex-row-reverse items-center gap-1'>
              <div className='h-[10px] w-[10px] rounded-full bg-ourBlue/20'></div>
              <div className='text-sm text-ourDarkGray'>1개</div>
            </div>
            <div className='flex flex-row-reverse items-center gap-1'>
              <div className='h-[10px] w-[10px] rounded-full bg-ourGreen'></div>
              <div className='text-sm text-ourDarkGray'>오늘</div>
            </div>
            <div className='flex flex-row-reverse items-center gap-1'>
              <div className='h-[10px] w-[10px] rounded-full bg-ourBlack'></div>
              <div className='text-sm text-ourDarkGray'>선택</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RecordList />
      </div>
    </div>
  );
}
