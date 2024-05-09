'use client';
import { useEffect, useState } from 'react';
import LearningItem from './LearningItem';
import instance from '@/utils/interceptor';

export type LearningItemType = {
  type: string;
  level: number;
  solved: boolean;
};

// 1. 주제맞추기
// 2. 정독훈련
// 3. 어휘
// 4. 문장삽입
// 5. 순서맞추기
export default function LearningBox() {
  const [learningItems, setLearningItems] = useState<LearningItemType[]>([]);

  const response = {
    data: {
      status: 'success',
      data: [
        {
          type: '정독훈련',
          level: 5,
          solved: true,
        },
        {
          type: '문장삽입',
          level: 2,
          solved: false,
        },
        {
          type: '순서맞추기',
          level: 3,
          solved: true,
        },
      ],
    },
  };

  const getData = () => {
    return response;
  };

  useEffect(() => {
    const tmp = getData();
    console.log(tmp);
    if (tmp.data.status === 'success') {
      setLearningItems(tmp.data.data);
    }
    handleLoad();
  }, []);

  const handleLoad = async () => {
    const response = await instance.get(`/study-service/problem/today`);
    console.log(response);
  };

  return (
    <div className='flex h-full gap-2'>
      {learningItems.map((learningItem, index) => (
        <div className='flex-1 rounded-2xl h-full' key={index}>
          <LearningItem key={index} learningItem={learningItem} />
        </div>
      ))}
    </div>
  );
}
