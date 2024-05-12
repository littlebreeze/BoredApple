import type { Metadata } from 'next';
import CloseButton from '../_components/CloseButton';
import Insert from './_components/Insert';

export const metadata: Metadata = {
  title: '문장넣기 - 오늘의 학습',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 학습',
};

export default function Page() {
  return (
    <div className='relative h-screen max-w-[1000px] mx-auto'>
      <div className='py-1'></div>
      <CloseButton />
      <div className='py-2'></div>
      <Insert />
    </div>
  );
}
