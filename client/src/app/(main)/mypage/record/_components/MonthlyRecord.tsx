'use client';

import { useState } from 'react';

export default function MonthlyRecord() {
  const [today, setToday] = useState<string>('4월 30일');
  return (
    <div className='flex flex-col p-5'>
      <div>달력</div>
      <div>
        <div>{today}</div>
        <div>학습내용</div>
      </div>
    </div>
  );
}
