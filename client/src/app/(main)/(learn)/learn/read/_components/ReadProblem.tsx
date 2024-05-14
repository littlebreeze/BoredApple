'use client';
import React from 'react';

const ReadProblem: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <div className='py-4'></div>
      <div className='flex'>
        <div className='mr-2'>정독 훈련</div>
        <div>
          <span className='text-ourBlue'>{progress}</span>
          <span className='text-ourBlack'> / 3</span>
        </div>
      </div>
      <div className='py-1'></div>
      <div>일정 시간 동안 보이는 각 문장을 읽고 가장 적절한 선택지를 고르세요. 준비됐다면 시작 버튼을 눌러주세요!</div>
      <div className='py-2'></div>
    </>
  );
};

export default ReadProblem;
