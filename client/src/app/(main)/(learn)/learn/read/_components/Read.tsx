'use client';
import { useState, useEffect, use } from 'react';
import instance from '@/utils/interceptor';
import checked from '@/../public/learn/checked.svg';
import unchecked from '@/../public/learn/unchecked.svg';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { BasicProblemResponse } from '@/types/Problem';

export default function Read() {
  const router = useRouter();
  const [wordProblems, setWordProblems] = useState<BasicProblemResponse>([]);
  const [wordProblemIndex, setWordProblemIndex] = useState(0);
  const [progress, setProgress] = useState(1);
  const [submit, setSubmit] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<(number | null)[]>([]);
  const [problemId, setProblemId] = useState<(number | null)[]>([]);

  const currWordProblem = wordProblems[wordProblemIndex];

  useEffect(() => {
    getWordData();
  }, []);

  useEffect(() => {
    if (submit === true) {
      const postData = async () => {
        const response = await instance.post('/study-service/solve/choice', {
          type: '어휘',
          myAnswer: userAnswer,
          problemId: problemId,
          spendTime: 50,
        });

        Swal.fire({
          title: '학습을 완료했어요!',
          text: '결과 페이지로 이동할게요.',
          confirmButtonColor: '#0064FF',
        });
        router.push('/learn/word/result');
      };
      postData();
    }
  }, [submit]);

  const getWordData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/intensive`);
      console.log(response.data.data);
      setWordProblems(response.data.data);
    } catch (error) {
      // error
    }
  };

  const handleNextClick = () => {
    if (selected !== null) {
      setUserAnswer((prevMyAnswer) => [...prevMyAnswer, selected]);
      setProblemId((prevProblemId) => [...prevProblemId, currWordProblem.problemId]);
      setProgress((prevProgress) => prevProgress + 1);
      setWordProblemIndex((prevIndex) => prevIndex + 1);
      setSelected(null);
    }
  };

  const handleOptionClick = (option: number) => {
    setSelected(option);
  };

  const handleFinishClick = () => {
    setUserAnswer((prevMyAnswer) => [...prevMyAnswer, selected]);
    setProblemId((prevProblemId) => [...prevProblemId, currWordProblem.problemId]);
    setSubmit(true);
  };

  return (
    <div>
      <div>
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
        <div className='py-4'></div>
        <div className='flex'>
          <div className='mr-2'>정독 훈련</div>
          <div>
            <span className='text-ourBlue'>{progress}</span>
            <span className='text-ourBlack'> / 3</span>
          </div>
        </div>
        <div className='py-1'></div>
        <div>각 문장을 정확히 끊어 읽고 문제를 풀어보세요. 준비됐다면 시작 버튼을 눌러주세요!</div>
        <div className='py-2'></div>

        {currWordProblem && (
          <div>
            <div className='flex gap-2'>
              <div className='p-4 h-fit flex-1 font-Batang select-none'>{currWordProblem.content}</div>
              <div>
                <div className='py-12'></div>
                <div className='w-96 bg-white rounded-xl p-4'>
                  <div
                    className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${selected === 1 ? 'bg-black text-white' : 'bg-[#f2f2f2]'} `}
                    onClick={() => handleOptionClick(1)}
                  >
                    <Image className='w-4 h-4 mr-2' src={selected === 1 ? checked : unchecked} alt='선택' />
                    <span>{currWordProblem.option1}</span>
                  </div>
                  <div
                    className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${selected === 2 ? 'bg-black text-white' : 'bg-[#f2f2f2]'} `}
                    onClick={() => handleOptionClick(2)}
                  >
                    <Image className='w-4 h-4 mr-2' src={selected === 2 ? checked : unchecked} alt='선택' />
                    <span>{currWordProblem.option2}</span>
                  </div>
                  <div
                    className={`cursor-pointer flex items-center p-2 m-1 rounded-xl ${selected === 3 ? 'bg-black text-white' : 'bg-[#f2f2f2]'} `}
                    onClick={() => handleOptionClick(3)}
                  >
                    <Image className='w-4 h-4 mr-2' src={selected === 3 ? checked : unchecked} alt='선택' />
                    <span>{currWordProblem.option3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
              className={`mt-4 px-12 p-2 w-40 ${selected !== null ? 'bg-ourBlue' : 'bg-ourGray'} rounded-3xl text-white duration-[0.2s] ${
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
