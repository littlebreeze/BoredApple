import type { Metadata } from 'next';
import Header from '@/app/_common/Header';
import Card from './_component/Card';
import CardContainer from './_component/CardContainer';
import SituationCard from './_component/SituationCard';
import UpsideAnimation from './_component/UpsideAnimation';
import LeftSideAnimation from './_component/LeftSideAnimation';
import RightSideAnimation from './_component/RightSideAnimation';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 소개 페이지',
};

export default function Page() {
  return (
    <div className='bg-white'>
      <Header />
      <div className='bg-ourTheme pt-32 pb-10 overflow-hidden'>
        <div className='flex flex-col items-center text-center gap-9'>
          <UpsideAnimation>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-xl'>당신의 문해력 지키미,</div>
              <div className='text-white font-Ansungtangmyun text-7xl'>심심한 사과</div>
            </div>
          </UpsideAnimation>
          <div
            className=' w-[215px] h-[60px] cursor-pointer bg-ourBlack flex justify-between items-center rounded-full text-white px-7 duration-[0.2s]
          hover:bg-ourBlue'
          >
            <div>시작하기</div>
            <div>→</div>
          </div>
        </div>
        {/* 움직일 div */}
        <CardContainer>
          {/* 카드를 감싼 div */}
          <div className='flex flex-row gap-[15px] justify-start items-stretch ml-[15px]'>
            <Card num={1} />
            <Card num={2} />
            <Card num={3} />
            <Card num={4} />
            <Card num={5} />
            <Card num={1} />
            <Card num={2} />
            <Card num={3} />
            <Card num={4} />
            <Card num={5} />
          </div>
        </CardContainer>
      </div>
      <div className='pt-24 pb-16 bg-ourBlue/5'>
        <UpsideAnimation>
          <div className='text-center'>
            <div className='mb-2 font-bold text-xl text-ourTheme'>다음과 같은 상황,</div>
            <div className='font-bold text-4xl text-ourBlack'>한 번쯤 겪어보지 않으셨나요?</div>
          </div>
        </UpsideAnimation>
        <div className='relative top-24 ping flex flex-col gap-5 justify-center px-5 md:px-28 md:flex-row items-center'>
          <SituationCard svg={'situation1'} content={'길다 싶으면 세줄 요약부터 찾기'} />
          <SituationCard svg={'situation2'} content={'한 문장을 읽고 또 읽기'} />
          <SituationCard svg={'situation3'} content={'대충 이런 말이겠거니 넘어가기'} />
          <SituationCard svg={'situation4'} content={`말할 때 '그거 있잖아' 반복하기`} />
        </div>
      </div>
      <div className='px-5 pt-36 flex flex-col justify-center gap-5'>
        <div className='text-center font-semibold text-xl mb-10'>
          이런 문해력 고민{' '}
          <mark className='bg-ourGreen/30 mr-1'>
            <span className='font-Ansungtangmyun text-3xl text-ourTheme'>심심한 사과</span>
          </mark>
          로 해결해보세요!
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>
              <div>작은타이틀</div>
              <div>타이틀</div>
              <div>자세한 설명</div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>사진</div>
          </div>
        </UpsideAnimation>
        <div className='w-full flex flex-col-reverse gap-5 md:flex-row lg:flex-row justify-center'>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <LeftSideAnimation>
              <div className='w-full h-80 bg-blue-100 rounded-lg'>글</div>
            </LeftSideAnimation>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <RightSideAnimation>
              <div className='w-full h-80 bg-blue-100 rounded-lg'>
                <div>작은타이틀</div>
                <div>타이틀</div>
                <div>자세한 설명</div>
              </div>
            </RightSideAnimation>
          </div>
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>
              <div>작은타이틀</div>
              <div>타이틀</div>
              <div>자세한 설명</div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>사진</div>
          </div>
        </UpsideAnimation>
        <div className='w-full flex flex-col-reverse gap-5 md:flex-row lg:flex-row justify-center'>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <LeftSideAnimation>
              <div className='w-full h-80 bg-blue-100 rounded-lg'>글</div>
            </LeftSideAnimation>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <RightSideAnimation>
              <div className='w-full h-80 bg-blue-100 rounded-lg'>
                <div>작은타이틀</div>
                <div>타이틀</div>
                <div>자세한 설명</div>
              </div>
            </RightSideAnimation>
          </div>
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>
              <div>작은타이틀</div>
              <div>타이틀</div>
              <div>자세한 설명</div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 bg-blue-100 rounded-lg'>사진</div>
          </div>
        </UpsideAnimation>
      </div>

      <div className='py-36 bg-ourBlue my-10 text-white'>
        <UpsideAnimation>
          <div className='text-center'>
            <div>심심한 사과에서 학습하고 게임을 하며 문해력을 높여보세요!</div>
          </div>
        </UpsideAnimation>
      </div>
    </div>
  );
}
