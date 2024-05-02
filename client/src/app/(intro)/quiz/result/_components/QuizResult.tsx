'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import result_1 from '@/../public/quiz/quiz-result-1.svg';
import result_2 from '@/../public/quiz/quiz-result-2.svg';
import result_3 from '@/../public/quiz/quiz-result-3.svg';
import result_4 from '@/../public/quiz/quiz-result-4.svg';
import result_5 from '@/../public/quiz/quiz-result-5.svg';
import quizResultTitle from '@/../public/quiz/quiz-result-title.svg';
import { quizResultData } from '@/../public/data/quizResultData';
import QuizShare from '../../_components/QuizShare';

export default function QuizResult() {
  const router = useRouter();
  let score: string | number | null = 0;

  if (typeof window !== 'undefined') {
    score = localStorage.getItem('score');

    if (score !== null) {
      score = parseInt(score);
    } else {
      score = 0;
    }
  }

  let resultImage;
  let resultDataIndex;
  if (score >= 90) {
    resultImage = result_1;
    resultDataIndex = 0;
  } else if (score >= 73) {
    resultImage = result_2;
    resultDataIndex = 1;
  } else if (score >= 59) {
    resultImage = result_3;
    resultDataIndex = 2;
  } else if (score >= 45) {
    resultImage = result_4;
    resultDataIndex = 3;
  } else {
    resultImage = result_5;
    resultDataIndex = 4;
  }

  // 문해력 높이러 가기
  const startService = () => {
    router.push('/');
  };

  // 다시 테스트하기
  const solveQuizAgain = () => {
    localStorage.removeItem('score');
    router.push('/quiz/solve');
  };

  return (
    <div>
      <Image className='pt-10 py-4 mx-auto mb-6 w-80' src={quizResultTitle} alt='진단결과' />
      <div className='flex bg-white rounded-xl border border-gray-300 p-10 py-16'>
        <div className='w-96'>
          <div className='mx-auto text-center text-xl font-semibold'>
            당신의 점수는 <span className='text-3xl font-semibold'>{score}</span>점
          </div>
          <div className='w-40 mx-auto'>
            <Image src={resultImage} alt='퀴즈 결과' />
          </div>
          <div className='text-lg font-semibold text-center w-72 mx-auto'>
            {quizResultData[resultDataIndex].title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
        <div className='flex-1 pr-6 pt-2'>
          <div className=''>
            {quizResultData[resultDataIndex].content.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className='w-96 mx-auto my-4'>
        <button className='mt-2 w-full h-12 rounded-lg text-lg text-ourTheme bg-white ' onClick={solveQuizAgain}>
          다시 테스트하기
        </button>
        <button className='my-2 w-full h-12 rounded-lg text-lg bg-ourTheme text-white' onClick={startService}>
          문해력 높이러 가기
        </button>
        <QuizShare />
      </div>
    </div>
  );
}
