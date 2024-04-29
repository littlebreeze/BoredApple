'use client';
import { useState } from 'react';
import { quizData, Quiz } from '../_data/QuizData';

export default function Quiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const totalQuizCount: number = quizData.length;

  const showNextQuiz = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % totalQuizCount);
    setSelectedOption(-1);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const currentQuiz: Quiz = quizData[currentQuizIndex];

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
                className={`rounded-full border border-gray-300    w-4 h-4 flex items-center justify-center mr-2 ${
                  selectedOption === index ? 'bg-ourYellow' : ''
                }`}
              ></span>
              {Object.values(optionObj)}
            </span>
          </div>
        ))}
      </div>
      {/* 버튼 */}
      <button
        className='absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg bg-ourBlue text-white'
        onClick={showNextQuiz}
      >
        다음
      </button>
    </>
  );
}
