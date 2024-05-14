'use client';
import React from 'react';

const WordProblem: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <div className='py-4'></div>
      <div className='flex'>
        <div className='mr-2'>어휘 퀴즈</div>
        <div>
          <span className='text-ourBlue'>{progress}</span>
          <span className='text-ourBlack'> / 3</span>
        </div>
      </div>
      <div className='py-1'></div>
      <div>다음 문장의 의미에 부합하는 적절한 어휘를 고르시오.</div>
      <div className='py-2'></div>
    </>
  );
};

export default WordProblem;
