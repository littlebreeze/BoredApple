import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘의 학습',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 문해력 학습',
};

export default function Page() {
  return <div className='bg-yellow-400'>오늘의 학습 페이지</div>;
}
