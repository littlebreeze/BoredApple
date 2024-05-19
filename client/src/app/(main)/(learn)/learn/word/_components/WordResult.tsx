'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import checkTrue from '@/../public/learn/check-true.svg';
import checkFalse from '@/../public/learn/check-false.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { IBasicProblem, BasicProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import WordProblem from './WordProblem';

export default function WordResult() {
  const router = useRouter();
  const [problems, setWordProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setWordProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  // console.log('########', date);

  useEffect(() => {
    getWordData();
  }, []);

  const getWordData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/voca${date ? '?date=' + date : ''}`);
      setWordProblems(response.data.data);
    } catch (error) {
      router.replace('/mypage/record');
    }
  };

  const handleNextClick = () => {
    setProgress((prevProgress) => prevProgress + 1);
    setWordProblemIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishClick = () => {
    if (searchParams.get('date')) router.push('/mypage/record');
    else router.push('/home');
  };

  const optionTextColor = (option: number) => {
    if (option === currProblem.answer && option === currProblem.userAnswer) {
      return 'text-ourBlue font-semibold';
    } else {
      if (option === currProblem.answer) {
        return 'text-ourBlue font-semibold';
      } else if (option === currProblem.userAnswer) {
        return 'text-ourRed line-through font-semibold';
      } else {
        return '';
      }
    }
  };

  const optionImage = (option: number) => {
    if (currProblem.userAnswer === option) {
      if (currProblem.userAnswer === currProblem.answer) {
        return checkTrue;
      } else {
        return checkFalse;
      }
    } else if (option === currProblem.answer) {
      return checkTrue;
    } else {
      return unchecked;
    }
  };

  return (
    <div>
      <div>
        {/* 상태 바 */}
        <ProgressBar progress={progress} />

        {/* 문제 */}
        <WordProblem progress={progress} />

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='p-4 h-fit flex-1 font-Batang'>{currProblem.content}</div>
              <div>
                <div className='py-12'></div>
                <div className='w-96 bg-white rounded-xl p-4'>
                  {[1, 2, 3].map((option) => (
                    <div
                      key={option}
                      className={`flex items-center p-2 m-1 rounded-xl ${optionTextColor(option)} bg-[#f2f2f2]`}
                    >
                      <Image className='w-4 h-4 mr-2' src={optionImage(option)} alt='선택' />
                      <span>{currProblem[`option${option}` as keyof IBasicProblem]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 버튼 */}
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
