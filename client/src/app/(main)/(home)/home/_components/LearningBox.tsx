'use client';
import { useEffect, useState } from 'react';
import LearningItem from './LearningItem';
import instance from '@/utils/interceptor';

export type LearningItemType = {
  type: string;
  difficulty: number;
  solved: boolean;
};

// 1. 주제맞추기
// 2. 정독훈련
// 3. 어휘
// 4. 문장삽입
// 5. 순서맞추기
export default function LearningBox() {
  const [learningItems, setLearningItems] = useState<LearningItemType[]>([]);

  useEffect(() => {
    const handleLoad = async () => {
      const response = await instance.get(`/study-service/problem/today`);
      if (response.data.status === 'success') {
        setLearningItems(response.data.data);
      }
    };
    handleLoad();
  }, []);

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
