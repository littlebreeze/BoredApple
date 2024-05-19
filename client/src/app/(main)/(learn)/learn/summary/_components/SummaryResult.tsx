'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import { useRouter, useSearchParams } from 'next/navigation';
import { SummaryProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import SummaryProblem from './SummaryProblem';

export default function SummaryResult() {
  const router = useRouter();
  const [problems, setProblems] = useState<SummaryProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    getSummaryData();
  }, []);

  const getSummaryData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/topic${date ? '?date=' + date : ''}`);
      setProblems(response.data.data);
    } catch (error) {
      // error
      router.replace('/mypage/record');
    }
  };

  // 별 개수 설정
  const getStars = (similarity: number) => {
    const stars = ['★ ☆ ☆', '★ ★ ☆', '★ ★ ★'];
    if (similarity >= 75) {
      return stars[2];
    } else if (similarity >= 50) {
      return stars[1];
    } else {
      return stars[0];
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

  return (
    <div>
      <div>
        {/* 상태 바 */}
        <ProgressBar progress={progress} />

        {/* 문제 */}
        <SummaryProblem progress={progress} />

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2 '>
              <div className='p-4 h-fit flex-1 font-Batang mr-4 mt-2 bg-ourGray'>
                <span className='leading-7 font-Batang'>{currProblem.content}</span>
              </div>
              <div className='bg-white rounded-xl p-4 w-96 mt-2'>
                <div className='flex gap-2'>
                  <div className='w-fit flex flex-col justify-center p-1 px-2 text-black text-xs rounded-full bg-ourGreen'>
                    {getStars(currProblem.similarity!)}
                  </div>
                  <div className='font-semibold w-fit p-1 px-3 text-white rounded-full bg-black text-xs flex items-center'>
                    {currProblem.similarity}% 유사
                  </div>
                </div>
                <div className='py-4'></div>
                <div className='font-semibold'>나의 답안</div>
                <div className='py-1'></div>
                <div className='bg-[#f2f2f2] p-3 rounded-xl'>
                  <div>{currProblem.userAnswer}</div>
                </div>
                <div className='py-4'></div>
                <div className='text-ourTheme font-semibold'>심심한 사과의 답안</div>
                <div className='py-1'></div>
                <div className='bg-[#f2f2f2] p-3 rounded-xl'>
                  <div className='text-ourTheme'>{currProblem.answer}</div>
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
