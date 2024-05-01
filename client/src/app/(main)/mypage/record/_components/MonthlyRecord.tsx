'use client';

import { useState } from 'react';
import StudyRecordItem from './StudyRecordItem';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type QuizType = { title: string; content: string; correct: boolean };

const quizType: QuizType[] = [
  { title: '정독 훈련', content: '비문학 지문을 읽고 문제를 풀어요.', correct: false },
  { title: '문장 넣기', content: '빈칸에 알맞은 문장을 넣어요.', correct: true },
  { title: '지문 요약', content: '비문학 지문을 읽고 요약해요.', correct: false },
  { title: '문장 순서 배열', content: '문장 순서를 올바르게 배열해요.', correct: true },
  { title: '어휘 퀴즈', content: '어휘력을 높여요.', correct: false },
];

export default function MonthlyRecord() {
  // const [today, setToday] = useState<string>('4월 30일');
  const [records, setRecords] = useState<QuizType[] | null>(quizType);
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='flex flex-col p-5 w-full'>
      <div className='flex justify-center'>
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
      <div>
        <div className='text-ourDarkGray text-xl font-semibold'>{value?.toLocaleString()}</div>
        <div className='bg-ourLightGray rounded-2xl p-4 flex flex-col gap-2'>
          {records
            ? records!.map((re: QuizType, idx: number) => {
                return <StudyRecordItem key={idx} record={re} />;
              })
            : '없다'}
        </div>
      </div>
    </div>
  );
}
