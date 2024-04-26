import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return <div className='bg-yellow-400'>문해력 테스트 페이지</div>;
}
