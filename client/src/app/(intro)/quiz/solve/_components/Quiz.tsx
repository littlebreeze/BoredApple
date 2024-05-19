'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizData, IQuiz } from '@/../public/data/quizData';
import useQuizStore from '@/stores/quizStore';

export default function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const totalQuizCount: number = quizData.length;
  const router = useRouter();
  const { score, setScore, initScore } = useQuizStore();

  useEffect(() => {
    initScore(0);
    localStorage.removeItem('score');
  }, []);

  // 결과 확인
  const showResult = () => {
    if (correct) {
      localStorage.setItem('score', (score + currentQuiz.score).toString());
    } else {
      localStorage.setItem('score', score.toString());
    }
    router.push('/quiz/result');
  };

  // 다음 문제 선택
  const showNextQuiz = () => {
    if (correct) {
      setScore(currentQuiz.score);
    }
    setCurrentQuizIndex(currentQuizIndex + 1);
    setSelectedOption(-1);
  };

  // 선지 선택
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    if (currentQuiz.answer === index + 1) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  const currentQuiz: IQuiz = quizData[currentQuizIndex];

  return (
    <>
      {/* 인덱스 */}
      <div className='w-full mr-2 text-right'>
        <span className='text-ourBlue'>{currentQuizIndex + 1}</span>
        <span className='text-ourBlack'> / 12</span>
      </div>

      {/* 문제 */}
      <div className='flex-col w-full px-10 pt-8 bg-white border rounded-xl border-neutral-200'>
        <div className='flex text-lg font-semibold'>
          <div>
            {currentQuiz.id}.&nbsp;&nbsp; {currentQuiz.question}
          </div>
        </div>
        <div className='mt-4 mb-8 font-Batang leading-7'>{currentQuiz.passage}</div>
      </div>

      {/* 선지 */}
      <div className='w-full px-10 my-4'>
        {currentQuiz.options.map((optionObj, index) => (
          <div className={`pt-2`} key={index}>
            <span className={`cursor-pointer flex items-center w-fit pr-4`} onClick={() => handleOptionClick(index)}>
              <span
                className={`rounded-full border border-gray-300 min-w-[14px] min-h-[14px] flex items-center justify-center mr-2 ${
                  selectedOption === index ? 'bg-ourYellow' : ''
                }`}
              ></span>
              {Object.values(optionObj)}
            </span>
          </div>
        ))}
      </div>
      {/* 버튼 */}
      {currentQuizIndex + 1 === totalQuizCount ? (
        <button
          className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg ${
            selectedOption === -1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourTheme duration-[0.2s] hover:brightness-90'
          } text-white`}
          onClick={showResult}
        >
          결과 확인하기
        </button>
      ) : (
        <button
          className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
            selectedOption === -1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80'
          } text-white`}
          onClick={selectedOption !== -1 ? showNextQuiz : undefined}
          disabled={selectedOption === -1}
        >
          다음
        </button>
      )}
    </>
  );
}
