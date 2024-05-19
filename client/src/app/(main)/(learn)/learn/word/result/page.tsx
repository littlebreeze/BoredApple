import type { Metadata } from 'next';
import WordResult from '../_components/WordResult';
import CloseButton from '../../_components/CloseButton';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '어휘퀴즈 - 오늘의 학습',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 학습',
};

export default function Page() {
  return (
    <div className='relative h-screen max-w-[1000px] mx-auto'>
      <div className='py-1'></div>
      <CloseButton />
      <div className='py-2'></div>
      <Suspense>
        <WordResult />
      </Suspense>
    </div>
  );
}
