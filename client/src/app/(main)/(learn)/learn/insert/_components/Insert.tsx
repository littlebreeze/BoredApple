'use client';
import { useState, useEffect, useRef } from 'react';
import instance from '@/utils/interceptor';
import checked from '@/../public/learn/checked.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { InsertProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import InsertProblem from './insertProblem';

export default function Insert() {
  const router = useRouter();
  const [problems, setProblems] = useState<InsertProblemResponse>([]);
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
    getInsertData();
  }, []);

  // 서버에 푼 문제 데이터 요청 전송
  useEffect(() => {
    if (submit === true) {
      const postData = async () => {
        const endTime = Date.now();
        const spendTime = Math.round((endTime - beginTime.current) / 1000);

        const response = await instance.post('/study-service/solve/choice', {
          type: '문장삽입',
          myAnswer: userAnswer,
          problemId: problemId,
          spendTime: spendTime,
        });

        Swal.fire({
          title: '학습을 완료했어요!',
          text: '결과 페이지로 이동할게요.',
          confirmButtonColor: '#0064FF',
        });
        router.push('/learn/insert/result');
      };
      postData();
    }
  }, [submit]);

  const temp = {
    status: 'success',
    data: [
      {
        content1:
          '인상주의 비평은 모든 분석적 비평에 대해 회의적인 시각을 가지고 있어 예술을 어떤 규칙이나 객관적 자료로 판단할 수 없다고 본다. “훌륭한 비평가는 대작들과 자기 자신의 영혼의 모험들을 관련시킨다.”라는 비평가 프랑스의 말처럼, ',
        content2:
          ' 즉, 인상주의 비평가는 작가의 의도나 그 밖의 외적인 요인들을 고려할 필요 없이 비평가의 자유 의지로 무한대의 상상력을 가지고 작품을 해석하고 판단한다.',
        option1: '인상주의 비평은 작품의 창작 과정과 작가의 의도를 중요시하지 않는다.',
        option2: '인상주의 비평은 작품을 객관적인 기준으로 평가하며, 공정성을 추구한다.',
        option3:
          '인상주의 비평은 비평가가 다른 저명한 비평가의 관점과 상관없이 자신의 생각과 느낌에 대하여 자율성과 창의성을 가지고 비평하는 것이다.',
        userAnswer: null,
        answer: null,
        category: '예술',
        type: '문장삽입',
        problemId: 12,
        correct: false,
      },
      {
        content1:
          '미술관에서 오랫동안 움직이지 않고 서 있는 관광객 차림의 부부를 본다면 사람들은 다시 한 번 바라볼 것이다. ',
        content2: ' 이처럼현실에 존재하는 것을 실재라고 믿을 수 있도록 재현하는 유파를 하이퍼리얼리즘이라고 한다.',
        option1: '사람들은 미술 작품인 줄 알고 그 부부를 주목할 것이다.',
        option2: '부부는 미술 작품이 아니라고 밝혀지면 주목받지 않을 것이다.',
        option3: '그것이 미술 작품이라는 것을 알고서도 놀랄 것이다.',
        userAnswer: null,
        answer: null,
        category: '예술',
        type: '문장삽입',
        problemId: 32,
        correct: false,
      },
      {
        content1: '상징은 말이나 형상이 명백한 의미 이상의 무언가를 내포하고 있는 것이다. ',
        content2:
          '어떤 환자는 음식물을 삼키려 할 때마다 심한 경련을 일으키는데, 그것은 음식물로 상징되는 상황을 용납할 수 없는무의식의 발현 때문이라고 할 수 있다. 무의식에서의 문제는 신체적 증상, 즉 신경증으로 나타나는 경우도 있지만 일반적으로는 꿈으로 나타나는 경우가 더 많다. 지크문트 프로이트는 꿈의 상징이 신경증보다 훨씬 더 풍부하고 다양하기 때문에 꿈은 환자의 무의식을 파악하는 데 중요한 단서가 된다고 보았다.',
        option1: '그 무언가는 정확하게 정의하거나 완벽하게 설명하지는 못하는 부분이기 때문에 무의식과 관련이 깊다.',
        option2: '상징은 항상 명확하게 해석되고 이해되지만, 때로는 다양한 해석을 허용한다.',
        option3: '상징은 단순히 시각적인 형상에 국한되지 않고 감정적인 의미도 내포할 수 있다.',
        userAnswer: null,
        answer: null,
        category: '예술',
        type: '문장삽입',
        problemId: 40,
        correct: false,
      },
    ],
  };

  // 문제 데이터 가져오기
  const getInsertData = async () => {
    try {
      // const response = await instance.get(`/study-service/problem/sentence`);
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
        <ProgressBar progress={progress} />

        {/* 문제 */}
        <InsertProblem progress={progress} />

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              <div>
                <div className='p-4 h-fit flex-1'>
                  <span className='font-Batang leading-7'>{currProblem.content1}</span>
                  <span className='select-none font-bold font-Batang bg-white p-1 rounded-lg px-4 mx-2'>
                    &nbsp;?&nbsp;
                  </span>
                  <span className='font-Batang leading-7'>{currProblem.content2}</span>
                </div>
              </div>
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
