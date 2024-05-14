'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LearningItemType } from './LearningBox';

import learnImg1 from '@/../public/learn/learn-1-theme.svg';
import learnImg2 from '@/../public/learn/learn-2-read.svg';
import learnImg3 from '@/../public/learn/learn-3-word.svg';
import learnImg4 from '@/../public/learn/learn-4-insert.svg';
import learnImg5 from '@/../public/learn/learn-5-order.svg';
import checked from '@/../public/signup/checked.svg';
import settings from '@/../public/learn/Settings.svg';

// 1. 주제맞추기
// 2. 정독훈련
// 3. 어휘
// 4. 문장삽입
// 5. 순서맞추기
type LearningItemProps = {
  learningItem: LearningItemType;
};

// export default function LearningItem(props: { learningItem: LearningItemType }) {
export default function LearningItem(props: LearningItemProps) {
  const router = useRouter();
  const { type, solved, difficulty } = props.learningItem;

  const handleClick = (type: number) => {
    switch (type) {
      case 1:
        if (!solved) {
          router.push('/learn/summary');
        } else {
          router.push('/learn/summary/result');
        }
        break;
      case 2:
        if (!solved) {
          router.push('/learn/read');
        } else {
          router.push('/learn/read/result');
        }
        break;
      case 3:
        if (!solved) {
          router.push('/learn/word');
        } else {
          router.push('/learn/word/result');
        }
        break;
      case 4:
        if (!solved) {
          router.push('/learn/insert');
        } else {
          router.push('/learn/insert/result');
        }
        break;
      case 5:
        if (!solved) {
          router.push('/learn/order');
        } else {
          router.push('/learn/order/result');
        }
        break;
    }
  };

  const renderTypeComponent = () => {
    switch (type) {
      case '주제맞추기':
        return <LearningItem1 difficulty={difficulty} solved={solved} handleClick={handleClick} />;
      case '정독훈련':
        return <LearningItem2 difficulty={difficulty} solved={solved} handleClick={handleClick} />;
      case '어휘':
        return <LearningItem3 difficulty={difficulty} solved={solved} handleClick={handleClick} />;
      case '문장삽입':
        return <LearningItem4 difficulty={difficulty} solved={solved} handleClick={handleClick} />;
      case '순서맞추기':
        return <LearningItem5 difficulty={difficulty} solved={solved} handleClick={handleClick} />;
      default:
        return <DefaultItem />;
    }
  };

  return <div className='flex-1 h-full '>{renderTypeComponent()}</div>;
}

const getStars = (difficulty: number) => {
  const stars = ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'];
  return stars[difficulty - 1] || '★★★☆☆';
};

// 지문 요약(주제맞추기)
const LearningItem1 = ({
  difficulty,
  solved,
  handleClick,
}: {
  difficulty: number;
  solved: boolean;
  handleClick: (type: number) => void;
}) => {
  const stars = getStars(difficulty);

  return (
    <div
      className={`flex justify-between bg-ourPink h-full rounded-2xl p-5 cursor-pointer ${
        solved ? 'brightness-50 duration-[0.2s] hover:brightness-75' : 'duration-[0.2s] hover:brightness-110'
      }`}
      onClick={() => {
        handleClick(1);
      }}
    >
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>비문학 지문을 읽고 요약해요</div>
          <div className='font-bold text-2xl'>지문 요약</div>
        </div>
        <div className='flex gap-2'>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>사실적 읽기</div>
          <div className='flex flex-col justify-center p-1 px-2 text text-[8px] rounded-lg bg-white'>{stars}</div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div>{solved ? <Image className='max-w-6' src={checked} alt='체크' /> : ''}</div>
        <div className='w-20'>
          <Image src={learnImg1} alt='책' />
          <div className=' py-10'></div>
        </div>
      </div>
    </div>
  );
};

// 정독 훈련(정독훈련)
const LearningItem2 = ({
  difficulty,
  solved,
  handleClick,
}: {
  difficulty: number;
  solved: boolean;
  handleClick: (type: number) => void;
}) => {
  const stars = getStars(difficulty);

  return (
    <div
      className={`flex justify-between bg-ourGreen h-full rounded-2xl p-5 cursor-pointer ${
        solved ? 'brightness-50 duration-[0.2s] hover:brightness-75' : 'duration-[0.2s] hover:brightness-110'
      }`}
      onClick={() => {
        handleClick(2);
      }}
    >
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>비문학 지문을 읽고 문제를 풀어요</div>
          <div className='font-bold text-2xl'>정독 훈련</div>
        </div>
        <div className='flex gap-2'>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>인지능력</div>
          <div className='flex flex-col justify-center p-1 px-2 text-[8px] rounded-lg bg-white'>{stars}</div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div>{solved ? <Image className='max-w-6' src={checked} alt='체크' /> : ''}</div>
        <div className='w-20'>
          <Image src={learnImg2} alt='책' />
          <div className='py-10'></div>
        </div>
      </div>
    </div>
  );
};

// 어휘 퀴즈(어휘)
const LearningItem3 = ({
  difficulty,
  solved,
  handleClick,
}: {
  difficulty: number;
  solved: boolean;
  handleClick: (type: number) => void;
}) => {
  const stars = getStars(difficulty);

  return (
    <div
      className={`flex justify-between bg-ourYellow h-full rounded-2xl p-5 cursor-pointer ${
        solved ? 'brightness-50 duration-[0.2s] hover:brightness-75' : 'duration-[0.2s] hover:brightness-110'
      }`}
      onClick={() => {
        handleClick(3);
      }}
    >
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>어휘력을 높여요</div>
          <div className='font-bold text-2xl'>어휘 퀴즈</div>
        </div>
        <div className='flex gap-2'>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>어휘력</div>
          <div className='flex flex-col justify-center p-1 px-2 text text-[8px] rounded-lg bg-white'>{stars}</div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div>{solved ? <Image className='max-w-6' src={checked} alt='체크' /> : ''}</div>
        <div className='w-20'>
          <Image src={learnImg3} alt='퀴즈' />
          <div className=' py-10'></div>
        </div>
      </div>
    </div>
  );
};

// 문장 넣기(문장삽입)
const LearningItem4 = ({
  difficulty,
  solved,
  handleClick,
}: {
  difficulty: number;
  solved: boolean;
  handleClick: (type: number) => void;
}) => {
  const stars = getStars(difficulty);

  return (
    <div
      className={`flex justify-between bg-ourRed h-full rounded-2xl p-5 cursor-pointer ${
        solved ? 'brightness-50 duration-[0.2s] hover:brightness-75' : 'duration-[0.2s] hover:brightness-105'
      }`}
      onClick={() => {
        handleClick(4);
      }}
    >
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>빈칸에 알맞은 문장을 넣어요</div>
          <div className='font-bold text-2xl'>문장 넣기</div>
        </div>
        <div className='flex gap-2'>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>추론 능력</div>
          <div className='flex flex-col justify-center p-1 px-2 text text-[8px] rounded-lg bg-white'>{stars}</div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div>{solved ? <Image className='max-w-6' src={checked} alt='체크' /> : ''}</div>
        <div className='w-20'>
          <Image src={learnImg4} alt='문장 삽입' />
          <div className=' py-10'></div>
        </div>
      </div>
    </div>
  );
};

// 문장 순서 배열(순서맞추기)
const LearningItem5 = ({
  difficulty,
  solved,
  handleClick,
}: {
  difficulty: number;
  solved: boolean;
  handleClick: (type: number) => void;
}) => {
  const stars = getStars(difficulty);

  return (
    <div
      className={`flex justify-between bg-ourPurple h-full rounded-2xl p-5 cursor-pointer ${
        solved ? 'brightness-50 duration-[0.2s] hover:brightness-75' : 'duration-[0.2s] hover:brightness-105'
      }`}
      onClick={() => {
        handleClick(5);
      }}
    >
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>문장 순서를 올바르게 배열해요</div>
          <div className='font-bold text-2xl'>문장 순서 배열</div>
        </div>
        <div className='flex gap-2'>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>추론 능력</div>
          <div className='p-1 px-2 text-xs font-semibold bg-white rounded-lg'>인지 능력</div>
          <div className='flex flex-col justify-center p-1 px-2 text text-[8px] rounded-lg bg-white'>{stars}</div>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div>{solved ? <Image className='max-w-6' src={checked} alt='체크' /> : ''}</div>
        <div className='w-20'>
          <Image src={learnImg5} alt='문장순서' />
          <div className=' py-10'></div>
        </div>
      </div>
    </div>
  );
};

const DefaultItem = () => {
  return (
    <div className='flex justify-between bg-ourGray h-full rounded-2xl p-5 cursor-pointer duration-[0.2s] hover:brightness-105'>
      <div className='flex flex-col justify-between '>
        <div>
          <div className='text-xs text-ourDarkGray'>문제를 열심히 만들고 있어요.</div>
          <div className='font-bold text-2xl'>준비 중입니다.</div>
        </div>
        <div className='flex gap-2'></div>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <div></div>
        <div className='w-20'>
          <Image src={settings} alt='설정' />
          <div className=' py-10'></div>
        </div>
      </div>
    </div>
  );
};
