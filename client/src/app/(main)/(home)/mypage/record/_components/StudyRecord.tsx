'use client';
import { useEffect, useState } from 'react';

import { SResponse } from '@/types/MypageRecord';
import instance from '@/utils/interceptor';
import { useRecordStore } from '@/stores/record';

import RecordDetailItem from './RecordDetailItem';

const getStudyData = async (yearMonth: Date | null) => {
  const response = await instance.post<{ data: SResponse }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/monthstudy`,
    {
      date: yearMonth,
      year: yearMonth?.getFullYear(),
      month: yearMonth!.getMonth() + 1,
    }
  );
  return response;
};

export default function StudyRecord() {
  const [studyData, setStudyData] = useState<SResponse>();
  // 월 바뀔 때 요청 보내기
  const { yearMonth } = useRecordStore();

  useEffect(() => {
    try {
      getStudyData(yearMonth).then((value) => setStudyData(value.data.data));
    } catch (error) {}
  }, [yearMonth?.getMonth()]);

  return (
    <div className='flex flex-col'>
      <div className='flex mb-2'>
        <svg
          className='mr-2'
          width='35'
          height='25'
          viewBox='0 0 534 400'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M484.848 11.7647C457.939 3.52941 428.364 0 400 0C352.727 0 301.818 9.41176 266.667 35.2941C231.515 9.41176 180.606 0 133.333 0C86.0606 0 35.1515 9.41176 0 35.2941V380C0 385.882 6.06061 391.765 12.1212 391.765C14.5455 391.765 15.7576 390.588 18.1818 390.588C50.9091 375.294 98.1818 364.706 133.333 364.706C180.606 364.706 231.515 374.118 266.667 400C299.394 380 358.788 364.706 400 364.706C440 364.706 481.212 371.765 515.151 389.412C517.576 390.588 518.788 390.588 521.212 390.588C527.273 390.588 533.333 384.706 533.333 378.824V35.2941C518.788 24.7059 503.03 17.6471 484.848 11.7647ZM484.848 329.412C458.182 321.176 429.091 317.647 400 317.647C358.788 317.647 299.394 332.941 266.667 352.941V82.3529C299.394 62.3529 358.788 47.0588 400 47.0588C429.091 47.0588 458.182 50.5882 484.848 58.8235V329.412Z'
            fill='#00C27C'
          />
          <path
            d='M400.002 141.186C421.336 141.186 441.942 143.304 460.608 147.304V111.539C441.457 108.009 420.851 105.892 400.002 105.892C358.79 105.892 321.457 112.715 290.911 125.421V164.48C318.305 149.421 356.366 141.186 400.002 141.186Z'
            fill='#00C27C'
          />
          <path
            d='M290.911 187.999V227.058C318.305 211.999 356.366 203.764 400.002 203.764C421.336 203.764 441.942 205.881 460.608 209.881V174.117C441.457 170.587 420.851 168.469 400.002 168.469C358.79 168.469 321.457 175.528 290.911 187.999Z'
            fill='#00C27C'
          />
          <path
            d='M400.002 231.295C358.79 231.295 321.457 238.118 290.911 250.824V289.883C318.305 274.824 356.366 266.589 400.002 266.589C421.336 266.589 441.942 268.707 460.608 272.707V236.942C441.457 233.177 420.851 231.295 400.002 231.295Z'
            fill='#00C27C'
          />
        </svg>

        <div className='text-[#00C27C] font-bold text-lg'>{yearMonth!.getMonth() + 1}월 학습</div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <RecordDetailItem title={'횟수'} content={studyData ? studyData!.totalCnt + '회' : '-'} />
        <RecordDetailItem
          title={'완료율'}
          content={studyData ? (studyData!.completePercent * 100).toFixed(1) + '%' : '-'}
        />
        <RecordDetailItem title={'가장 많이 한 학습'} content={studyData ? studyData!.type : '-'} />
        <RecordDetailItem title={'가장 많이 읽은 분야'} content={studyData ? studyData!.category : '-'} />
      </div>
    </div>
  );
}
