'use client';
import { useState, useEffect, useRef } from 'react';
import instance from '@/utils/interceptor';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { SummaryProblemResponse } from '@/types/Problem';

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
      const response = await instance.get(`/study-service/problem/topic`);
      setProblems(response.data.data);
    } catch (error) {
      // error
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
          <div className='mr-2'>지문 요약</div>
          <div>
            <span className='text-ourBlue'>{progress}</span>
            <span className='text-ourBlack'> / 3</span>
          </div>
        </div>
        <div className='py-1'></div>
        <div>다음 글을 읽고 문단의 핵심 내용을 담아 한 문장으로 요약해보세요.</div>
        <div className='py-2'></div>

        {/* 지문 및 선택지 */}
        {currProblem && (
          <div>
            <div className='flex gap-2'>
              {/* 지문 */}
              <div>
                <div className='p-4 h-fit flex-1'>
                  <span className='font-Batang'>{currProblem.content}</span>
                </div>
              </div>
              <div>
                <div className='py-12'></div>
                <div className='bg-white p-4 rounded-lg'>
                  <textarea
                    className='h-40 w-96 outline-none resize-none'
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
