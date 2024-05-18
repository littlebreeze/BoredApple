'use client';

import { useEffect, useState } from 'react';

import { GResponse } from '@/types/MypageRecord';
import { useGameRecord } from '@/queries/mypage-record';

import RecordDetailItem from './RecordDetailItem';

export default function GameRecord() {
  const [gameRecord, setGameRecord] = useState<GResponse | undefined>(undefined);

  const { data, isLoading } = useGameRecord();

  // 마운트 되었을 때 요청 보내기
  useEffect(() => {
    if (data?.data) setGameRecord(data.data.data);
  }, [isLoading]);

  return (
    <div className='flex flex-col'>
      <div className='flex mb-2'>
        <svg
          className='mr-2'
          width='35'
          height='25'
          viewBox='0 0 400 400'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M140 310V370C140 378.333 142.917 385.417 148.75 391.25C154.583 397.083 161.667 400 170 400H230C238.333 400 245.417 397.083 251.25 391.25C257.083 385.417 260 378.333 260 370V310C260 301.667 257.083 294.583 251.25 288.75C245.417 282.917 238.333 280 230 280H170C161.667 280 154.583 282.917 148.75 288.75C142.917 294.583 140 301.667 140 310ZM120 230V170C120 161.667 117.083 154.583 111.25 148.75C105.417 142.917 98.3333 140 90 140H30C21.6667 140 14.5833 142.917 8.75 148.75C2.91667 154.583 0 161.667 0 170V230C0 238.333 2.91667 245.417 8.75 251.25C14.5833 257.083 21.6667 260 30 260H90C98.3333 260 105.417 257.083 111.25 251.25C117.083 245.417 120 238.333 120 230ZM170 260H230C238.333 260 245.417 257.083 251.25 251.25C257.083 245.417 260 238.333 260 230V170C260 161.667 257.083 154.583 251.25 148.75C245.417 142.917 238.333 140 230 140H170C161.667 140 154.583 142.917 148.75 148.75C142.917 154.583 140 161.667 140 170V230C140 238.333 142.917 245.417 148.75 251.25C154.583 257.083 161.667 260 170 260ZM310 260H370C378.333 260 385.417 257.083 391.25 251.25C397.083 245.417 400 238.333 400 230V170C400 161.667 397.083 154.583 391.25 148.75C385.417 142.917 378.333 140 370 140H310C301.667 140 294.583 142.917 288.75 148.75C282.917 154.583 280 161.667 280 170V230C280 238.333 282.917 245.417 288.75 251.25C294.583 257.083 301.667 260 310 260ZM310 120H370C378.333 120 385.417 117.083 391.25 111.25C397.083 105.417 400 98.3333 400 90V30C400 21.6667 397.083 14.5833 391.25 8.75C385.417 2.91667 378.333 0 370 0H310C301.667 0 294.583 2.91667 288.75 8.75C282.917 14.5833 280 21.6667 280 30V90C280 98.3333 282.917 105.417 288.75 111.25C294.583 117.083 301.667 120 310 120Z'
            fill='#F45C5E'
          />
        </svg>
        <div className='text-[#F45C5E] font-bold text-lg'>전체 대전 기록</div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <RecordDetailItem title={'우승 횟수'} content={gameRecord ? gameRecord!.numberOfWin + '번' : '-'} />
        <RecordDetailItem title={'총 경기 횟수'} content={gameRecord ? gameRecord!.numberOfGame + '번' : '-'} />
        <RecordDetailItem
          title={'승률'}
          content={
            gameRecord && gameRecord!.numberOfGame > 0
              ? ((gameRecord!.numberOfWin / gameRecord!.numberOfGame) * 100).toFixed(1) + '%'
              : '-'
          }
        />
        <RecordDetailItem
          title={'랭킹(*점수)'}
          content={
            gameRecord
              ? (Number(gameRecord!.rank) === -1 ? '99+' : gameRecord!.rank) + '위(*' + gameRecord!.rating + ')'
              : '-'
          }
        />
      </div>
    </div>
  );
}
