import type { Metadata } from 'next';
import Image from 'next/image';
import quiz from '@/../public/quiz/quiz-main.svg';
import ogQuiz from '@/../public/openGraph/og-quiz-image.jpg';
import QuizStart from './_components/QuizStart';
import QuizShare from './_components/QuizShare';

export const metadata: Metadata = {
  title: '문해력 테스트',
  description: '문해력 테스트',
  // openGraph: {
  //   type: 'website',
  //   title: '심심한 사과:: 문해력 테스트',
  //   description: '당신의 문해력이 궁금하신가요?\n 지금 당장 진단해 보세요!',
  //   url: `${process.env.NEXT_PUBLIC_PUBLIC_SERVICE_URL}/quiz`,
  //   images: [{ url: `${ogQuiz}`, alt: '문해력 자가진단' }],
  // },
};

export default function Page() {
  return (
    <div className=' mx-auto max-w-[1200px] flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <div className='my-12 text-4xl font-Ansungtangmyun'>문해력 자가진단 테스트</div>
        <Image className='mb-12 w-96' src={quiz} alt='quiz' />
        <QuizStart />
        <QuizShare />
      </div>
    </div>
  );
}
