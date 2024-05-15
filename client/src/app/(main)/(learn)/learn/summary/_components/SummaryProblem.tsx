'use client';
import React from 'react';

const SummaryProblem: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <div className='py-4'></div>
      <div className='flex'>
        <div className='mr-2'>지문 요약</div>
        <div>
          <span className='text-ourBlue'>{progress}</span>
          <span className='text-ourBlack'> / 3</span>
        </div>
      </div>
      <div className='py-1'></div>
      <div>다음 글을 읽고 문단의 핵심 내용을 담아 한 문장으로 요약해보세요.</div>
      <div className='py-2'></div>
    </>
  );
};

export default SummaryProblem;
