'use client';
import { useEffect } from 'react';

const data = {
  status: 200,
  data: [
    {
      type: '주제맞추기',
      category: '인문',
      solved: false,
    },
    {
      type: '정독훈련',
      category: '과학',
      solved: false,
    },
    {
      type: '어휘',
      category: '기술',
      solved: true,
    },
    {
      type: '문장삽입',
      category: '인문',
      solved: true,
    },
    {
      type: '순서맞추기',
      category: '인문',
      solved: true,
    },
  ],
};

const getData = () => {
  return data;
};

export default function LearningBox() {
  useEffect(() => {
    const response = getData();
    console.log('안녕', response);
  }, []);

  return (
    <div className='flex h-full gap-4'>
      <div className='flex-1 bg-red-200 rounded-2xl'>으</div>
      <div className='flex-1 bg-slate-200 rounded-2xl'>악</div>
      <div className='flex-1 bg-green-200 rounded-2xl'>새</div>
    </div>
  );
}
