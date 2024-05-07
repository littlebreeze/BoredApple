'use client';

import CalendarComponent from './CalendarComponent';
import RecordList from './RecordList';

export default function MonthlyRecord() {
  return (
    <div className='flex flex-col p-5 w-full'>
      <div className='flex justify-center'>
        <div>
          <CalendarComponent />
        </div>
      </div>
      <div>
        <RecordList />
      </div>
    </div>
  );
}
