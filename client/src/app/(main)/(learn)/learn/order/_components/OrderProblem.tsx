'use client';
import React from 'react';

const OrderProblem: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <>
      <div className='py-4'></div>
      <div className='flex'>
        <div className='mr-2'>문장 순서 배열</div>
        <div>
          <span className='text-ourBlue'>{progress}</span>
          <span className='text-ourBlack'> / 3</span>
        </div>
      </div>
      <div className='py-1'></div>
      <div>주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.</div>
      <div className='py-2'></div>
    </>
  );
};

export default OrderProblem;
