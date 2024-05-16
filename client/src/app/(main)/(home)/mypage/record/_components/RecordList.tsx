'use client';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; //한국어

import { Study, RResponse } from '@/types/MypageRecord';
import instance from '@/utils/interceptor';
import { useRecordStore } from '@/stores/record';

import StudyRecordItem from './StudyRecordItem';

const getDailyData = async (today: Date | null) => {
  const response = await instance.post<{ data: Study[] }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/daystudy`,
    {
      date: today,
      year: today?.getFullYear(),
      month: today!.getMonth() + 1,
      day: today!.getDate(),
    }
  );
  return response;
};

const tmpRecords = [
  {
    problemType: '정독훈련',
    correct: true,
  },
  {
    problemType: '순서맞추기',
    correct: false,
  },
  {
    problemType: '주제맞추기',
    correct: true,
  },
  {
    problemType: '문장삽입',
    correct: true,
  },
  {
    problemType: '어휘',
    correct: true,
  },
];

export default function RecordList() {
  const [records, setRecords] = useState<Study[]>([]);

  const { parseValueIntoDate } = useRecordStore();
  const { today } = useRecordStore();

  useEffect(() => {
    // 요청 보내기
    getDailyData(parseValueIntoDate(today)).then((value) => setRecords(value.data.data));
  }, [today]);

  return (
    <>
      <div className='text-ourDarkGray text-xl font-semibold ml-5 my-2'>
        {dayjs(parseValueIntoDate(today)).format('MM월 DD일')}
      </div>
      <div className='bg-ourLightGray rounded-2xl p-4 flex flex-col gap-2'>
        {records.length > 0 ? (
          records!.map((re: Study, idx: number) => {
            return (
              <StudyRecordItem key={idx} record={re} today={dayjs(parseValueIntoDate(today)).format('YYYY-MM-DD')} />
            );
          })
        ) : (
          <div className='flex gap-2'>
            <div>
              <svg width='25' height='25' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M150 28.125C82.6875 28.125 28.125 82.6875 28.125 150C28.125 217.313 82.6875 271.875 150 271.875C217.313 271.875 271.875 217.313 271.875 150C271.875 82.6875 217.313 28.125 150 28.125ZM117.188 103.125C110.437 103.125 106.838 108.362 105.488 111.05C103.884 114.431 103.076 118.134 103.125 121.875C103.125 125.6 103.863 129.438 105.488 132.7C106.838 135.388 110.425 140.625 117.188 140.625C123.938 140.625 127.537 135.388 128.887 132.7C130.512 129.45 131.25 125.6 131.25 121.875C131.25 118.15 130.512 114.312 128.887 111.05C127.537 108.362 123.95 103.125 117.188 103.125ZM171.113 111.05C172.463 108.362 176.05 103.125 182.812 103.125C189.563 103.125 193.162 108.362 194.512 111.05C196.137 114.3 196.875 118.15 196.875 121.875C196.875 125.6 196.137 129.438 194.512 132.7C193.162 135.388 189.575 140.625 182.812 140.625C176.062 140.625 172.463 135.388 171.113 132.7C169.509 129.319 168.701 125.616 168.75 121.875C168.75 118.15 169.488 114.312 171.113 111.05ZM196.4 196.4C197.321 195.542 198.06 194.507 198.572 193.357C199.085 192.207 199.36 190.965 199.382 189.707C199.405 188.448 199.173 187.197 198.702 186.03C198.23 184.863 197.528 183.802 196.638 182.912C195.748 182.022 194.687 181.32 193.52 180.848C192.353 180.377 191.102 180.145 189.843 180.168C188.585 180.19 187.343 180.465 186.193 180.978C185.043 181.49 184.008 182.229 183.15 183.15C178.797 187.504 173.629 190.958 167.941 193.314C162.253 195.671 156.157 196.884 150 196.884C143.843 196.884 137.747 195.671 132.059 193.314C126.371 190.958 121.203 187.504 116.85 183.15C115.073 181.494 112.722 180.592 110.293 180.635C107.865 180.678 105.547 181.662 103.83 183.38C102.112 185.097 101.128 187.415 101.085 189.843C101.042 192.272 101.944 194.623 103.6 196.4C115.907 208.705 132.597 215.617 150 215.617C167.403 215.617 184.093 208.705 196.4 196.4Z'
                  fill='#202632'
                />
              </svg>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='font-semibold text-ourDarkGray'>학습한 내용이 없습니다.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
