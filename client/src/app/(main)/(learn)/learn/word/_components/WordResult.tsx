'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import checkTrue from '@/../public/learn/check-true.svg';
import checkFalse from '@/../public/learn/check-false.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IBasicProblem, BasicProblemResponse } from '@/types/Problem';

export default function WordResult() {
  const router = useRouter();
  const [wordProblems, setWordProblems] = useState<BasicProblemResponse>([]);
  const [wordProblemIndex, setWordProblemIndex] = useState(0);

  const [progress, setProgress] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);

  const currWordProblem = wordProblems[wordProblemIndex];

  useEffect(() => {
    getWordData();
  }, []);

  const getWordData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/voca`);
      setWordProblems(response.data.data);
    } catch (error) {
      // error
    }
  };

  const handleNextClick = () => {
    setProgress((prevProgress) => prevProgress + 1);
    setWordProblemIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishClick = () => {
    router.push('/home');
  };

  const optionTextColor = (option: number) => {
    if (option === currWordProblem.answer && option === currWordProblem.userAnswer) {
      return 'text-ourBlue font-semibold';
    } else {
      if (option === currWordProblem.answer) {
        return 'text-ourBlue font-semibold';
      } else if (option === currWordProblem.userAnswer) {
        return 'text-ourRed line-through font-semibold';
      } else {
        return '';
      }
    }
  };

  const optionImage = (option: number) => {
    if (currWordProblem.userAnswer === option) {
      if (currWordProblem.userAnswer === currWordProblem.answer) {
        return checkTrue;
      } else {
        return checkFalse;
      }
    } else if (option === currWordProblem.answer) {
      return checkTrue;
    } else {
      return unchecked;
    }
  };

  return (
    <div>
      <div>
        <div>
          {progress === 1 ? (
            <div className='flex gap-3'>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourGray'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourGray'></div>
            </div>
          ) : progress === 2 ? (
            <div className='flex gap-3'>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourGray'></div>
            </div>
          ) : (
            <div className='flex gap-3'>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
              <div className='flex-1 rounded-3xl p-1 bg-ourBlue'></div>
            </div>
          )}
        </div>
        <div className='py-4'></div>
        <div className='flex'>
          <div className='mr-2'>어휘 퀴즈</div>
          <div>
            <span className='text-ourBlue'>{progress}</span>
            <span className='text-ourBlack'> / 3</span>
          </div>
        </div>
        <div className='py-1'></div>
        <div>다음 문장의 의미에 부합하는 적절한 어휘를 고르시오.</div>
        <div className='py-2'></div>

        {currWordProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='p-4 h-fit flex-1 font-Batang'>{currWordProblem.content}</div>
              <div>
                <div className='py-12'></div>
                <div className='w-96 bg-white rounded-xl p-4'>
                  {[1, 2, 3].map((option) => (
                    <div
                      key={option}
                      className={`flex items-center p-2 m-1 rounded-xl ${optionTextColor(option)} bg-[#f2f2f2]`}
                    >
                      <Image className='w-4 h-4 mr-2' src={optionImage(option)} alt='선택' />
                      <span>{currWordProblem[`option${option}` as keyof IBasicProblem]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='flex border-t border-ourGray absolute bottom-4 w-full justify-end'>
          {progress >= 3 ? (
            <button
              className='mt-4 px-12 p-2 w-40 bg-black
              rounded-3xl text-white duration-[0.2s] hover:brightness-90'
              onClick={handleFinishClick}
            >
              확인완료
            </button>
          ) : (
            <button
              className='mt-4 px-12 p-2 w-40 bg-ourBlue rounded-3xl text-white duration-[0.2s] hover:bg-ourTheme/80'
              onClick={handleNextClick}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
