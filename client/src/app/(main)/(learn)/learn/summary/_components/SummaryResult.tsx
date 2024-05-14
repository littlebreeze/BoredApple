'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import { useRouter } from 'next/navigation';
import { SummaryProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import SummaryProblem from './SummaryProblem';

export default function SummaryResult() {
  const router = useRouter();
  const [problems, setProblems] = useState<SummaryProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  useEffect(() => {
    getSummaryData();
  }, []);

  const temp = {
    status: 'success',
    data: [
      {
        content:
          '변증법의 매력은 ‘종합’에 있다. 종합의 범주는 두 대립적범주 중 하나의 일방적 승리로 끝나도 안 되고, 두 범주의고유한 본질적 규정이 소멸되는 중화 상태로 나타나도 안 된다. 종합은 양자의 본질적 규정이 유기적 조화를 이루어 질적으로 고양된 최상의 범주가 생성됨으로써 성립하는 것이다.',
        userAnswer: null,
        answer: null,
        type: '주제맞추기',
        problemId: null,
        similarity: null,
      },
      {
        content:
          'PCR는 시료로부터 얻은 DNA를 가지고 유전자 복제, 유전병 진단, 친자 감별, 암 및 감염성 질병 진단 등에 광범위하게 활용된다. 특히 실시간 PCR를 이용하면 바이러스의 감염여부를 초기에 정확하고 빠르게 진단할 수 있다.',
        userAnswer: null,
        answer: null,
        type: '주제맞추기',
        problemId: null,
        similarity: null,
      },
      {
        content:
          '채권은 어떤 사람이 다른 사람에게 특정 행위를 요구할 수있는 권리이다. 이 특정 행위를 급부라 하고, 특정 행위를 해주어야 할 의무를 채무라 한다. 채무자가 채권을 가진 이에게 급부를 이행하면 채권에 대응하는 채무는 소멸한다. 급부는 재화나 서비스 제공인 경우가 많지만 그 외의 내용일 수도 있다.',
        userAnswer: null,
        answer: null,
        type: '주제맞추기',
        problemId: null,
        similarity: null,
      },
    ],
  };

  const getSummaryData = async () => {
    try {
      // const response = await instance.get(`/study-service/problem/topic`);
      // setProblems(response.data.data);
      setProblems(temp.data);
    } catch (error) {
      // error
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
    router.push('/home');
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
