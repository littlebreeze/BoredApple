'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizData, IQuiz } from '../_data/QuizData';
import useQuizStore from '../../../../../store/QuizStore';
import CorrectAnswer from '../../result/_components/CorrectAnser';

export default function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const totalQuizCount: number = quizData.length;
  const router = useRouter();
  const { correctQuiz, setCorrectQuiz } = useQuizStore();

  // 다음 문제
  const showNextQuiz = () => {
    console.log('정답수', correctQuiz);

    if (currentQuizIndex + 1 === totalQuizCount) {
      router.push('/quiz/result');
    } else {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
    setSelectedOption(-1);
  };

  // 선지 선택
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    if (currentQuiz.answer === index + 1) {
      setCorrectQuiz(correctQuiz + 1);
    }
  };

  const currentQuiz: IQuiz = quizData[currentQuizIndex];

  return (
    <>
      {/* 문제 */}
      <div className='w-full bg-white rounded-xl flex-col px-10 pt-10 border border-neutral-200'>
        <div className='flex font-semibold text-lg'>
          <div>
            {currentQuiz.id}.&nbsp;&nbsp; {currentQuiz.question}
          </div>
        </div>
        <div className='font-Batang mt-4 mb-10'>{currentQuiz.passage}</div>
      </div>
      {/* 선지 */}
      <div className='my-4 w-full p-10'>
        {currentQuiz.options.map((optionObj, index) => (
          <div className={`mt-1 cursor-pointer`} onClick={() => handleOptionClick(index)} key={index}>
            <span className={`flex items-center `}>
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
            selectedOption === -1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourTheme'
          } text-white`}
          onClick={() => router.push('/quiz/result')}
        >
          결과 확인하기
        </button>
      ) : (
        <button
          className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg ${
            selectedOption === -1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourBlue'
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
