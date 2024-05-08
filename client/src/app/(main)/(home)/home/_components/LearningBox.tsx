'use client';
import { useEffect } from 'react';
import LearningItem1 from './LearningItem1';
import instance from '@/utils/interceptor';

// 주제맞추기 1
// 정독훈련 2
// 어휘 3
// 문장삽입 4
// 순서맞추기 5
export default function LearningBox() {
  // const data = {
  //   status: 200,
  //   data: [
  //     {
  //       type: '주제맞추기',
  //       solved: false,
  //       level: 1,
  //     },
  //     {
  //       type: '정독훈련',
  //       solved: false,
  //       level: 3,
  //     },
  //     {
  //       type: '순서맞추기',
  //       solved: true,
  //       level: 5,
  //     },
  //   ],
  // };

  // const getData = () => {
  //   return data;
  // };

  useEffect(() => {
    console.log('함수 실행');
    handleLoad();
  }, []);

  const handleLoad = async () => {
    const response = await instance.get(`/study-service/problem/today`);
    console.log(response);
  };

  return (
    <div className='flex h-full gap-4'>
      <LearningItem1 />
      <LearningItem1 />
      <LearningItem1 />
    </div>
  );
}
