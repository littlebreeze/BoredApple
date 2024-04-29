import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 오늘의 문해력 학습',
};

export default function Page() {
  return <div className='bg-yellow-400'>홈 페이지</div>;
}
