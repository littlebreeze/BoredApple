import Header from '@/app/_common/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 소개 페이지',
};

export default function Page() {
  return (
    <div>
      <Header />
      <div className='bg-yellow-400'>서비스 소개 페이지 정보</div>
    </div>
  );
}
