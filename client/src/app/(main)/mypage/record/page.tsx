import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '학습 일지',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default function Page() {
  return <div className='bg-yellow-400'>학습 일지 페이지</div>;
}
