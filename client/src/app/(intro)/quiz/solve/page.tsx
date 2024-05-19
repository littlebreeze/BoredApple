import type { Metadata } from 'next';
import Image from 'next/image';
import quizTitle from '@/../public/quiz/quiz-title.svg';
import Quiz from './_components/Quiz';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return (
    <div className='mx-auto min-h-screen max-w-[800px] flex flex-col items-center py-10 relative'>
      <Image className='mb-2 w-80' src={quizTitle} alt='자가진단' />
      <Quiz />
    </div>
  );
}
