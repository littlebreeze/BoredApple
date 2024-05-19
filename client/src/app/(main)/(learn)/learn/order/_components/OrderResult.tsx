'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import checkTrue from '@/../public/learn/check-true.svg';
import checkFalse from '@/../public/learn/check-false.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BasicProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import OrderProblem from './OrderProblem';

export default function OrderResult() {
  const router = useRouter();
  const [problems, setProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    getOrderData();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/order${date ? '?date=' + date : ''}`);
      setProblems(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      // error
      router.replace('/mypage/record');
    }
  };

  const handleNextClick = () => {
    setProgress((prevProgress) => prevProgress + 1);
    setProblemIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishClick = () => {
    if (searchParams.get('date')) router.push('/mypage/record');
    else router.push('/home');
  };

  const optionTextColor = (option: number) => {
    const userAnswer = currProblem.userAnswer;
    const correctAnswer = currProblem.answer;

    if (userAnswer === correctAnswer && option === correctAnswer) {
      return 'bg-[#f2f2f2] text-ourBlue select-none';
    } else if (option === correctAnswer) {
      return 'bg-[#f2f2f2] text-ourBlue select-none';
    } else if (option === userAnswer) {
      return 'bg-[#f2f2f2] text-ourRed line-through select-none';
    } else {
      return 'bg-[#f2f2f2] text-black select-none';
    }
  };

  const optionImage = (option: number) => {
    const userAnswer = currProblem.userAnswer;
    const correctAnswer = currProblem.answer;

    if (userAnswer === correctAnswer && option === correctAnswer) {
      return checkTrue;
    } else if (option === correctAnswer) {
      return checkTrue;
    } else if (option === userAnswer) {
      return checkFalse;
    } else {
      return unchecked;
    }
  };

  const options = [
    { id: 1, label: '가 - 나 - 다', value: 123 },
    { id: 2, label: '가 - 다 - 나', value: 132 },
    { id: 3, label: '나 - 가 - 다', value: 213 },
    { id: 4, label: '나 - 다 - 가', value: 231 },
    { id: 5, label: '다 - 가 - 나', value: 312 },
    { id: 6, label: '다 - 나 - 가', value: 321 },
  ];

  return (
    <div>
      <div>
        {/* 상태 바 */}
        <ProgressBar progress={progress} />

        {/* 문제 */}
        <OrderProblem progress={progress} />

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <div className='max-h-32 mt-2 bg-ourGray mr-4 leading-7 p-4  font-Batang select-none text-sm overflow-y-scroll scrollbar-hide'>
                  {currProblem.content}
                </div>

                {/* 순서 단락 */}
                <div className='mt-2 bg-ourGray mr-4 '>
                  <div className='p-4 flex flex-col gap-2 max-h-80 overflow-y-scroll scrollbar-hide'>
                    <div className='p-4 rounded-xl text-sm bg-ourLightGray'>
                      <div className='flex leading-7 '>
                        <span className='font-Batang mr-3 font-semibold '>가</span>
                        <span className='font-Batang'>{currProblem.option1}</span>
                      </div>
                    </div>
                    <div className='leading-7 p-4 rounded-xl text-sm bg-ourLightGray'>
                      <div className='flex leading-7 '>
                        <span className='font-Batang mr-3 font-semibold '>나</span>
                        <span className='font-Batang'>{currProblem.option2}</span>
                      </div>
                    </div>
                    <div className='leading-7 p-4 rounded-xl text-sm bg-ourLightGray'>
                      <div className='flex leading-7 '>
                        <span className='font-Batang mr-3 font-semibold '>다</span>
                        <span className='font-Batang'>{currProblem.option3}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 선택지 */}
              <div>
                <div className='pt-2'></div>
                <div className='w-96 bg-white rounded-xl p-4'>
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center p-2 m-1 rounded-xl ${optionTextColor(option.value)}`}
                    >
                      <Image className='w-4 h-4 mr-2' src={optionImage(option.value)} alt='선택' />
                      <span>{option.label}</span>
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
