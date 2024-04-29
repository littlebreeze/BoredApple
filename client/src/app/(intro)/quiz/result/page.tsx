import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문해력 테스트 결과',
  description: '문해력 테스트 결과',
};

export default function Page() {
  return <div className='bg-yellow-400'>퀴즈 결과 페이지</div>;
}
