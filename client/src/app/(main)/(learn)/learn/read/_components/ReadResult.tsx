'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import checkTrue from '@/../public/learn/check-true.svg';
import checkFalse from '@/../public/learn/check-false.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IBasicProblem, BasicProblemResponse } from '@/types/Problem';

export default function ReadResult() {
  const router = useRouter();
  const [problems, setProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  useEffect(() => {
    getReadData();
  }, []);

  // 임시 데이터
  const temp = {
    status: 'success',
    data: [
      {
        content:
          '중력은 모든 물체에 작용하는 자연 법칙이다. |  이것은 물체가 지구 중심으로 떨어지는 이유이기도 하다. |  또한 중력은 우주의 다양한 현상에 영향을 미친다. |  행성들의 공전 경로부터 별의 운동까지 중력이 관여한다. | ',
        option1: '중력은 지구만의 현상이다.',
        option2: '중력은 모든 물체에 작용하는 자연 법칙이다.',
        option3: '중력은 인간이 만든 것이다.',
        userAnswer: 2,
        answer: 2,
        category: '과학',
        type: '정독훈련',
        problemId: 3,
        correct: false,
      },
      {
        content:
          '태양계는 여러 행성과 소행성, 위성 등으로 구성되어 있다. |  각 천체들은 자신만의 공전 궤도를 가지며 태양 주위를 돌고 있다. |  이러한 천체들의 운동은 우주의 원리를 이해하는 데 중요한 단서를 제공한다. | ',
        option1: '태양은 지구 중심으로 공전한다.',
        option2: '태양계는 여러 행성과 소행성, 위성 등으로 구성되어 있다.',
        option3: '행성들의 운동은 무질서하다.',
        userAnswer: 2,
        answer: 3,
        category: '과학',
        type: '정독훈련',
        problemId: 8,
        correct: false,
      },
      {
        content:
          '태양계는 여러 행성과 소행성, 위성 등으로 구성되어 있다. |  각 천체들은 자신만의 공전 궤도를 가지며 태양 주위를 돌고 있다. |  이러한 천체들의 운동은 우주의 원리를 이해하는 데 중요한 단서를 제공한다. | ',
        option1: '태양은 지구 중심으로 공전한다.',
        option2: '태양계는 여러 행성과 소행성, 위성 등으로 구성되어 있다.',
        option3: '행성들의 운동은 무질서하다.',
        userAnswer: 2,
        answer: 1,
        category: '과학',
        type: '정독훈련',
        problemId: 13,
        correct: false,
      },
    ],
  };

  const getReadData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/intensive`);
      setProblems(response.data.data);
    } catch (error) {
      // error
    }
  };

  const handleNextClick = () => {
    setProgress((prevProgress) => prevProgress + 1);
    setProblemIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishClick = () => {
    router.push('/home');
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

        {/* 문제 */}
        <div className='py-4'></div>
        <div className='flex'>
          <div className='mr-2'>정독 훈련</div>
          <div>
            <span className='text-ourBlue'>{progress}</span>
            <span className='text-ourBlack'> / 3</span>
          </div>
        </div>
        <div className='py-1'></div>
        <div>각 문장을 정확히 끊어 읽고 가장 적절한 선택지를 고르세요. 준비됐다면 시작 버튼을 눌러주세요!</div>
        <div className='py-2'></div>

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='p-4 h-fit flex-1 font-Batang'> {currProblem.content.replace(/\|/g, '')}</div>
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
