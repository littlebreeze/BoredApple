'use client';
import { useState, useEffect, useRef } from 'react';
import checked from '@/../public/learn/checked.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import instance from '@/utils/interceptor';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { BasicProblemResponse } from '@/types/Problem';

export default function Order() {
  const router = useRouter();
  const [problems, setProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<(number | null)[]>([]);
  const [problemId, setProblemId] = useState<(number | null)[]>([]);

  const beginTime = useRef<number>(0);
  const currProblem = problems[problemIndex];

  // 문제 풀이 시간 설정
  // 문제 데이터 가져오기
  useEffect(() => {
    beginTime.current = Date.now();
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
        userAnswer: null,
        answer: null,
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
        userAnswer: null,
        answer: null,
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
        userAnswer: null,
        answer: null,
        category: '인문',
        type: '순서맞추기',
        problemId: 11,
        correct: false,
      },
    ],
  };

  // 서버에 푼 문제 데이터 요청 전송
  useEffect(() => {
    if (submit === true) {
      const postData = async () => {
        const endTime = Date.now();
        const spendTime = Math.round((endTime - beginTime.current) / 1000);

        // const response = await instance.post('/study-service/solve/choice', {
        //   type: '순서맞추기',
        //   myAnswer: userAnswer,
        //   problemId: problemId,
        //   spendTime: spendTime,
        // });

        console.log({
          type: '순서맞추기',
          myAnswer: userAnswer,
          problemId: problemId,
          spendTime: spendTime,
        });

        Swal.fire({
          title: '학습을 완료했어요!',
          text: '결과 페이지로 이동할게요.',
          confirmButtonColor: '#0064FF',
        });
        router.push('/learn/order/result');
      };
      postData();
    }
  }, [submit]);

  // 문제 데이터 가져오기
  const getOrderData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/order`);
      // setProblems(response.data.data);
      // console.log(response.data.data);
      setProblems(temp.data);
    } catch (error) {
      // error
    }
  };

  // 다음 버튼 클릭
  const handleNextClick = () => {
    if (selected !== null) {
      let value: number;
      switch (selected) {
        case 1:
          value = 123;
          break;
        case 2:
          value = 132;
          break;
        case 3:
          value = 213;
          break;
        case 4:
          value = 231;
          break;
        case 5:
          value = 312;
          break;
        case 6:
          value = 321;
          break;
      }
      setUserAnswer((prevMyAnswer) => [...prevMyAnswer, value]);
      setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
      setProgress((prevProgress) => prevProgress + 1);
      setProblemIndex((prevIndex) => prevIndex + 1);
      setSelected(null);
    }
  };

  // 학습 완료 버튼 클릭
  const handleFinishClick = () => {
    setUserAnswer((prevMyAnswer) => [...prevMyAnswer, selected]);
    setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
    setSubmit(true);
  };

  // 선택지 클릭
  const handleOptionClick = (option: number) => {
    setSelected(option);
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
            <div className='flex gap-2 '>
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

              <div>
                <div className='py-12'></div>
                <div className='w-96 bg-white rounded-xl p-4'>
                  <div className='flex'>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 1 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(1)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 1 ? checked : unchecked} alt='선택' />
                      <span>가 - 나 - 다</span>
                    </div>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 2 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(2)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 2 ? checked : unchecked} alt='선택' />
                      <span>가 - 다 - 나</span>
                    </div>
                  </div>
                  <div className='flex'>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 3 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(3)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 3 ? checked : unchecked} alt='선택' />
                      <span>나 - 가 - 다</span>
                    </div>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 4 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(4)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 4 ? checked : unchecked} alt='선택' />
                      <span>나 - 다 - 가</span>
                    </div>
                  </div>
                  <div className='flex'>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 5 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(5)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 5 ? checked : unchecked} alt='선택' />
                      <span>다 - 가 - 나</span>
                    </div>
                    <div
                      className={`flex-1 cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                        selected === 6 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                      } `}
                      onClick={() => handleOptionClick(6)}
                    >
                      <Image className='w-4 h-4 mr-2' src={selected === 6 ? checked : unchecked} alt='선택' />
                      <span>다 - 나 - 가</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className='flex border-t border-ourGray absolute bottom-4 w-full justify-end'>
          {progress >= 3 ? (
            <button
              className={`mt-4 px-12 p-2 w-40 ${
                selected !== null ? 'bg-ourTheme' : 'bg-ourGray cursor-not-allowed'
              } rounded-3xl text-white duration-[0.2s] hover:brightness-90`}
              onClick={handleFinishClick}
              disabled={selected === null}
            >
              학습 완료
            </button>
          ) : (
            <button
              className={`mt-4 px-12 p-2 w-40 ${
                selected !== null ? 'bg-ourBlue' : 'bg-ourGray'
              } rounded-3xl text-white duration-[0.2s] ${
                selected === null ? 'cursor-not-allowed' : 'hover:bg-ourTheme/80'
              }`}
              onClick={handleNextClick}
              disabled={selected === null}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
