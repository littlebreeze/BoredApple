'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import checkTrue from '@/../public/learn/check-true.svg';
import checkFalse from '@/../public/learn/check-false.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BasicProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';

export default function OrderResult() {
  const router = useRouter();
  const [problems, setProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);

  const currProblem = problems[problemIndex];

  useEffect(() => {
    getOrderData();
  }, []);

  // 임시 데이터
  const temp = {
    status: 'success',
    data: [
      {
        content: '우리는 어떤 시대에 살고 있을까?',
        option1: '과거를 돌아보면 우리의 미래를 알 수 있다.',
        option2: '빛의 속도로 여행하면 시간은 역행할까?',
        option3: '문명의 발전과 함께 우리의 삶은 어떻게 변해왔을까?',
        userAnswer: 213,
        answer: 321,
        category: '인문',
        type: '순서맞추기',
        problemId: 1,
        correct: false,
      },
      {
        content: '인간은 왜 존재하는가?',
        option1: '사랑은 인간의 본능일까?',
        option2: '자유란 무엇인가?',
        option3: '행복은 어떻게 얻을 수 있는가?',
        userAnswer: 231,
        answer: 231,
        category: '인문',
        type: '순서맞추기',
        problemId: 6,
        correct: false,
      },
      {
        content: '과거는 어떻게 현재와 연결되어 있는가?',
        option1: '세계 문화의 다양성은 우리에게 무엇을 가르쳐 주는가?',
        option2: '종교는 우리의 삶에 어떤 영향을 끼치는가?',
        option3: '문명의 충돌은 어떻게 해결되어야 하는가?',
        userAnswer: 123,
        answer: 132,
        category: '인문',
        type: '순서맞추기',
        problemId: 11,
        correct: false,
      },
    ],
  };

  const getOrderData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/order`);
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
        <div className='py-4'></div>
        <div className='flex'>
          <div className='mr-2'>문장 순서 배열</div>
          <div>
            <span className='text-ourBlue'>{progress}</span>
            <span className='text-ourBlack'> / 3</span>
          </div>
        </div>
        <div className='py-1'></div>
        <div>주어진 글 다음에 이어질 글의 순서로 가장 적절한 것을 고르시오.</div>
        <div className='py-2'></div>

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='flex-1'>
                {/* 초기 문장 */}
                <div className='pl-4 pt-4 pb-2 font-Batang select-none text-sm'>{currProblem.content}</div>

                {/* 순서 단락 */}
                <div>
                  <div className='py-2'></div>
                  <div className='bg-white rounded-xl p-4 flex flex-col gap-2'>
                    <div className=' p-4 rounded-xl text-sm bg-ourLightGray'>
                      <span className='mr-3 font-semibold'>가</span>
                      <span className='font-Batang'>{currProblem.option1}</span>
                    </div>
                    <div className=' p-4 rounded-xl text-sm bg-ourLightGray'>
                      <span className='mr-3 font-semibold'>나</span>
                      <span className='font-Batang'>{currProblem.option2}</span>
                    </div>
                    <div className=' p-4 rounded-xl text-sm bg-ourLightGray'>
                      <span className='mr-3 font-semibold'>다</span>
                      <span className='font-Batang'>{currProblem.option3}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 선택지 */}
              <div>
                <div className='py-12'></div>
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
