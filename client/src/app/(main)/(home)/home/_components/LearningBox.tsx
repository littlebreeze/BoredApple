'use client';
import { useEffect, useState } from 'react';
import LearningItem from './LearningItem';
import instance from '@/utils/interceptor';

export type LearningItemType = {
  type: string;
  level: number;
  solved: boolean;
};

export default function LearningBox() {
  const [learningItems, setLearningItems] = useState<LearningItemType[]>([]);

  const response = {
    data: {
      status: 'success',
      data: [
        {
          type: '주제맞추기',
          level: 5,
          solved: false,
        },
        {
          type: '정독훈련',
          level: 2,
          solved: false,
        },
        {
          type: '어휘',
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
    const response = getData();
    console.log(response);
    if (response.data.status === 'success') {
      setLearningItems(response.data.data);
    }
  }, []);

  // const handleLoad = async () => {
  //   const response = await instance.get(`/study-service/problem/today`);
  //   console.log(response);
  // };

  return (
    <div className='flex h-full'>
      {learningItems.map((learningItem, index) => (
        <div className='flex-1 rounded-2xl h-full' key={index}>
          <LearningItem key={index} learningItem={learningItem} />
        </div>
      ))}
    </div>
  );
}
