'use client';
import { useState, useEffect, useRef } from 'react';
import instance from '@/utils/interceptor';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { SummaryProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';
import SummaryProblem from './SummaryProblem';

export default function Summary() {
  const router = useRouter();
  const [problems, setProblems] = useState<SummaryProblemResponse>([]);
  const [problemIndex, setProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [userAnswer, setUserAnswer] = useState<(string | null)[]>([]);
  const [input, setInput] = useState('');
  const [problemId, setProblemId] = useState<(number | null)[]>([]);

  const beginTime = useRef<number>(0);
  const currProblem = problems[problemIndex];

  // 문제 풀이 시간 설정
  // 문제 데이터 가져오기
  useEffect(() => {
    beginTime.current = Date.now();
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

  // 서버에 푼 문제 데이터 요청 전송
  useEffect(() => {
    if (submit === true) {
      const postData = async () => {
        const endTime = Date.now();
        const spendTime = Math.round((endTime - beginTime.current) / 1000);

        const response = await instance.post('/study-service/solve/essay', {
          type: '주제맞추기',
          myAnswer: userAnswer,
          problemId: problemId,
          spendTime: spendTime,
        });

        Swal.fire({
          title: '학습을 완료했어요!',
          text: '결과 페이지로 이동할게요.',
          confirmButtonColor: '#0064FF',
        });
        router.push('/learn/summary/result');
      };
      postData();
    }
  }, [submit]);

  // 문제 데이터 가져오기
  const getSummaryData = async () => {
    try {
      // const response = await instance.get(`/study-service/problem/topic`);
      // setProblems(response.data.data);
      setProblems(temp.data);
    } catch (error) {
      // erro
    }
  };

  // 다음 버튼 클릭
  const handleNextClick = () => {
    if (input !== '') {
      setUserAnswer((prevMyAnswer) => [...prevMyAnswer, input]);
      setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
      setProgress((prevProgress) => prevProgress + 1);
      setProblemIndex((prevIndex) => prevIndex + 1);
      setInput('');
    }
  };

  // 학습 완료 버튼 클릭
  const handleFinishClick = () => {
    setUserAnswer((prevMyAnswer) => [...prevMyAnswer, input]);
    setProblemId((prevProblemId) => [...prevProblemId, currProblem.problemId]);
    setSubmit(true);
  };

  // 정답 입력 시 글자 수 감지
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setInput(input);
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
            <div className='flex gap-2'>
              {/* 지문 */}
              <div className='flex-1'>
                <div className='p-4 h-fit  mr-4 mt-2 bg-ourGray '>
                  <span className='leading-7 font-Batang'>{currProblem.content}</span>
                </div>
              </div>
              <div className='w-96'>
                <div className='pt-2'></div>
                <div className='bg-white p-4 rounded-lg'>
                  <textarea
                    className='h-40 outline-none resize-none w-full'
                    name='input'
                    value={input}
                    onChange={handleTextareaChange}
                    maxLength={100}
                    cols={30}
                    rows={8}
                  ></textarea>
                  <div className=' select-none text-xs text-ourGray text-end'>{input ? input.length : 0} / 100 자</div>
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
                input !== '' ? 'bg-ourTheme' : 'bg-ourGray cursor-not-allowed'
              } rounded-3xl text-white duration-[0.2s] hover:brightness-90`}
              onClick={handleFinishClick}
              disabled={input === ''}
            >
              학습 완료
            </button>
          ) : (
            <button
              className={`mt-4 px-12 p-2 w-40 ${
                input !== '' ? 'bg-ourBlue' : 'bg-ourGray'
              } rounded-3xl text-white duration-[0.2s] ${input === '' ? 'cursor-not-allowed' : 'hover:bg-ourTheme/80'}`}
              onClick={handleNextClick}
              disabled={input === ''}
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
