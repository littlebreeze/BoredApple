'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';
import { useRouter } from 'next/navigation';
import { SummaryProblemResponse } from '@/types/Problem';
import ProgressBar from '../../_components/ProgressBar';

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
    data: [
      {
        content:
          '독서는 자기 내면으로의 여행이며 외부 세계로의 확장이다.폐허 속에서도 책을 찾은 사람들은 독서가 지닌 힘을 알고,자신과 현실에 대한 이해를 구하고자 책과의 대화를 시도하고 있었던 것이다.',
        userAnswer:
          '100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자',
        answer:
          '정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다.',
        type: '주제맞추기',
        problemId: null,
        similarity: 78,
      },
      {
        content:
          '해결하려는 문제와 관련하여 관점이 다른 책들을 함께 읽는 것은 해법을 찾는 한 방법이다. 먼저 문제가 무엇인 지를 명확히 하고, 이와 관련된 서로 다른 관점의 책을 찾 는다. 책을 읽을 때는 자신의 관점에서 각 관점들을 비교·대조하면서 정보의 타당성을 비판적으로 검토하고 평가한 내용을 통합한다. 이를 통해 문제를 다각적·심층적 으로 이해하게 됨으로써 자신의 관점을 분명히 하고, 나아가 생각을 발전시켜 관점을 재구성하게 됨으로써 해법을 찾을 수 있다.',
        userAnswer:
          '100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자',
        answer:
          '정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다.',
        type: '주제맞추기',
        problemId: null,
        similarity: 55,
      },
      {
        content:
          '광고는 시장의 형태 중 독점적 경쟁 시장에서 그 효과가크다. 독점적 경쟁 시장은, 유사하지만 차별적인 상품을 다수의 판매자가 경쟁하며 판매하는 시장이다. 각 판매자는 자신이 공급하는 상품을 구매자가 차별적으로 인지하고 선호할수 있도록 하기 위해 광고를 이용한다. 판매자에게 그러한 차별적 인지와 선호가 중요한 이유는, 이를 통해 판매자가 자신의 상품을 원하는 구매자에 대해 누리는 독점적 지위를 강화할 수 있기 때문이다.',
        userAnswer:
          '100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자 테스트100자',
        answer:
          '정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다. 정답입니다.',
        type: '주제맞추기',
        problemId: null,
        similarity: 54,
      },
    ],
  };

  const getSummaryData = async () => {
    try {
      const response = await instance.get(`/study-service/problem/topic`);
      setProblems(response.data.data);
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
              <div className='p-4 h-fit flex-1 font-Batang'>
                <span className='font-Batang'>{currProblem.content}</span>
              </div>
              <div className='bg-white rounded-xl p-4 w-96'>
                <div className='w-fit flex flex-col justify-center p-1 px-2 text-white text-[8px] rounded-full bg-ourTheme'>
                  {getStars(currProblem.similarity!)}
                </div>
                <div className='py-1 p-2 rounded-xl'></div>
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
