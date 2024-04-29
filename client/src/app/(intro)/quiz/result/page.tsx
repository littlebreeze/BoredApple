import type { Metadata } from 'next';
import CorrectAnswer from './_components/CorrectAnser';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return (
    <div>
      <div className=''>퀴즈 결과 페이지</div>
      <CorrectAnswer />
    </div>
  );
}
