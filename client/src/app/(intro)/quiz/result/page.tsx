import type { Metadata } from 'next';
import QuizResult from './_components/QuizResult';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return (
    <div className='max-w-[800px] mx-auto flex items-center justify-center '>
      <QuizResult />
    </div>
  );
}
