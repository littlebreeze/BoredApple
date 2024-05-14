'use client';
import { useState, useEffect, useRef } from 'react';
import instance from '@/utils/interceptor';
import checked from '@/../public/learn/checked.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { BasicProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import ReadProblem from './ReadProblem';
import replay from '@/../public/learn/replay.svg';

export default function Read() {
  const router = useRouter();
  const [problems, setProblems] = useState<BasicProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<(number | null)[]>([]);
  const [problemId, setProblemId] = useState<(number | null)[]>([]);
  const [start, setStart] = useState(false);
  const [currSentence, setCurrSentence] = useState(0);

  const beginTime = useRef<number>(0);
  const currProblem = problems[problemIndex];

  // 문제 풀이 시간 설정
  // 문제 데이터 가져오기
  useEffect(() => {
    beginTime.current = Date.now();
    getReadData();
  }, []);

  const temp = {
    status: 'success',
    data: [
      {
        content:
          '독서는 자기 내면으로의 여행이며 외부 세계로의 확장이다. | 폐허 속에서도 책을 찾은 사람들은 독서가 지닌 힘을 알고,자신과 현실에 대한 이해를 구하고자 책과의 대화를 시도하고 있었던 것이다. | ',
        option1: '독서는 오로지 지식 습득을 위한 수단으로만 사용되며, 내면 성장에는 도움이 되지 않는다.',
        option2: '책을 읽는 것은 시간 낭비이며, 예술에서는 무시되는 활동이다.',
        option3: '독서는 자기 내면으로의 여행이며 외부 세계로의 확장이다.',
        userAnswer: null,
        answer: null,
        category: '과학',
        type: '정독훈련',
        problemId: 32,
        correct: false,
      },
      {
        content:
          '해결하려는 문제와 관련하여 관점이 다른 책들을 함께 읽는 것은 해법을 찾는 한 방법이다. |  먼저 문제가 무엇인 지를 명확히 하고, 이와 관련된 서로 다른 관점의 책을 찾 는다. |  책을 읽을 때는 자신의 관점에서 각 관점들을 비교·대조하면서 정보의 타당성을 비판적으로 검토하고 평가한 내용을 통합한다. |  이를 통해 문제를 다각적·심층적 으로 이해하게 됨으로써 자신의 관점을 분명히 하고, 나아가 생각을 발전시켜 관점을 재구성하게 됨으로써 해법을 찾을 수 있다. | ',
        option1: '다양한 관점을 고려하여 문제를 다각적으로 이해하고 해결책을 찾는 것이 중요하다.',
        option2: '문제 해결을 위해서는 한 가지 관점에만 의존하는 것이 더 효과적이다.',
        option3: '다양한 관점을 고려하는 것은 시간 낭비이며, 실제로는 문제 해결에 도움이 되지 않는다.',
        userAnswer: null,
        answer: null,
        category: '과학',
        type: '정독훈련',
        problemId: 33,
        correct: false,
      },
      {
        content:
          '광고는 시장의 형태 중 독점적 경쟁 시장에서 그 효과가크다. |  독점적 경쟁 시장은, 유사하지만 차별적인 상품을 다수의 판매자가 경쟁하며 판매하는 시장이다. |  각 판매자는 자신이 공급하는 상품을 구매자가 차별적으로 인지하고 선호할수 있도록 하기 위해 광고를 이용한다. |  판매자에게 그러한 차별적 인지와 선호가 중요한 이유는, 이를 통해 판매자가 자신의 상품을 원하는 구매자에 대해 누리는 독점적 지위를 강화할 수 있기 때문이다. | ',
        option1: '광고는 독점적 경쟁 시장에서 특히 효과적이다.',
        option2: '독점적 경쟁 시장에서는 다수의 판매자가 경쟁하기 때문에 독점적인 지위를 누리기 어렵다는 점이 있다.',
        option3: '광고는 독점적 경쟁 시장에서만 효과적인 것은 아니다. 경쟁적 시장에서도 효과적으로 사용된다.',
        userAnswer: null,
        answer: null,
        category: '과학',
        type: '정독훈련',
        problemId: 37,
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

        const response = await instance.post('/study-service/solve/choice', {
          type: '정독훈련',
          myAnswer: userAnswer,
          problemId: problemId,
          spendTime: spendTime,
        });

        Swal.fire({
          title: '학습을 완료했어요!',
          text: '결과 페이지로 이동할게요.',
          confirmButtonColor: '#0064FF',
        });
        router.push('/learn/read/result');
      };
      postData();
    }
  }, [submit]);

  // 3초마다 문장을 바꿔서 보여주는 함수
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (start) {
      intervalId = setInterval(() => {
        setCurrSentence((prevSentence) => {
          if (prevSentence === currProblem.content.split('|').length - 1) {
            clearInterval(intervalId);
            return prevSentence;
          }
          return prevSentence + 1;
        });
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [start, currProblem]);

  // 문제 데이터 가져오기
  const getReadData = async () => {
    try {
      // const response = await instance.get(`/study-service/problem/intensive`);
      // setProblems(response.data.data);
      setProblems(temp.data);
    } catch (error) {
      // error
    }
  };

  // 다음 버튼 클릭
  const handleNextClick = () => {
    if (selected !== null) {
      setUserAnswer((prevMyAnswer) => [...prevMyAnswer, selected]);
      setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
      setProgress((prevProgress) => prevProgress + 1);
      setProblemIndex((prevIndex) => prevIndex + 1);
      setSelected(null);
      setStart(false);
    }
  };

  // 학습 완료 버튼 클릭
  const handleFinishClick = () => {
    setUserAnswer((prevMyAnswer) => [...prevMyAnswer, selected]);
    setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
    setSubmit(true);
  };

  // 시작 버튼 클릭
  const handleStartClick = () => {
    setStart(true);
    setCurrSentence(0);
  };

  // 선택지 클릭
  const handleOptionClick = (option: number) => {
    setSelected(option);
  };

  return (
    <div>
      <div>
        {/* 상태 바 */}
        <ProgressBar progress={progress} />

        {/* 문제 */}
        <ReadProblem progress={progress} />

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              {!start ? (
                // 시작 버튼
                <div className='flex-1'>
                  <button
                    className='mt-2 cursor-pointer bg-black p-4 rounded-xl h-10 flex justify-center items-center text-white'
                    onClick={handleStartClick}
                  >
                    ▶ &nbsp;&nbsp;시작
                  </button>
                </div>
              ) : (
                // 지문 및 선택지 및 다시 읽기
                <div className='flex flex-1 gap-2'>
                  {/* 지문 */}
                  <div className='mt-2 flex-1 h-fit'>
                    <div
                      className='leading-7 font-Batang select-none bg-ourGray p-4 mr-4 '
                      style={{
                        display: currSentence === currProblem.content.split('|').length - 1 ? 'none' : 'block',
                      }}
                    >
                      {currProblem.content.split('|').map((sentence, index) => (
                        <span key={index} style={{ visibility: currSentence === index ? 'visible' : 'hidden' }}>
                          {sentence}
                        </span>
                      ))}
                    </div>

                    {/* 다시 읽기 */}
                    <div
                      className=''
                      style={{
                        display: currSentence === currProblem.content.split('|').length - 1 ? 'block' : 'none',
                      }}
                    >
                      <div className='flex-1'>
                        <button
                          className='mt-2 cursor-pointer bg-black p-4 rounded-xl h-10 flex justify-center items-center text-white'
                          onClick={handleStartClick}
                        >
                          <span className='w-fit'>
                            <Image className='w-4 mr-2' src={replay} alt='다시 하기' />
                          </span>
                          <span>다시 읽기</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 선택지 */}
                  <div>
                    <div className='pt-2'></div>
                    <div className='w-96 bg-white rounded-xl p-4'>
                      <div
                        className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                          selected === 1 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                        } `}
                        onClick={() => handleOptionClick(1)}
                      >
                        <Image className='w-4 h-4 mr-2' src={selected === 1 ? checked : unchecked} alt='선택' />
                        <span>{currProblem.option1}</span>
                      </div>
                      <div
                        className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                          selected === 2 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                        } `}
                        onClick={() => handleOptionClick(2)}
                      >
                        <Image className='w-4 h-4 mr-2' src={selected === 2 ? checked : unchecked} alt='선택' />
                        <span>{currProblem.option2}</span>
                      </div>
                      <div
                        className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${
                          selected === 3 ? 'bg-black text-white' : 'bg-[#f2f2f2]'
                        } `}
                        onClick={() => handleOptionClick(3)}
                      >
                        <Image className='w-4 h-4 mr-2' src={selected === 3 ? checked : unchecked} alt='선택' />
                        <span>{currProblem.option3}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
