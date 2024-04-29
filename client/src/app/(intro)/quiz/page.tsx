import type { Metadata } from 'next';
import Image from 'next/image';
import quiz from '../../../../public/quiz-main.svg';
import QuizStart from './_components/QuizStart';
import QuizShare from './_components/QuizShare';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
};

export default function Page() {
  return (
    <div className=' mx-auto max-w-[1200px] flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <div className='font-Ansungtangmyun text-4xl my-12'>문해력 자가진단 테스트</div>
        <Image className='w-96 mb-12' src={quiz} alt='quiz' />
        <QuizStart />
        <QuizShare />
      </div>
    </div>
  );
}
