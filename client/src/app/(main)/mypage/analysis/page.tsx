import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '분석 보고서',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default function Page() {
  return <div className='bg-yellow-400'>분석 페이지</div>;
}
