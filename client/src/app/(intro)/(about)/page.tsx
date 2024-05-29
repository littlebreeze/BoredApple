import type { Metadata } from 'next';
import Header from '@/app/_common/Header';
import Card from './_component/Card';
import CardContainer from './_component/CardContainer';
import SituationCard from './_component/SituationCard';
import UpsideAnimation from './_component/UpsideAnimation';
import LeftSideAnimation from './_component/LeftSideAnimation';
import RightSideAnimation from './_component/RightSideAnimation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지킴이',
  description: '문해력 학습 서비스 심심한 사과의 소개 페이지',
};

export default function Page() {
  return (
    <div className='bg-white'>
      <Header />
      <div className='bg-ourTheme overflow-hidden h-dvh flex flex-col-reverse md:flex-row lg:flex-row justify-between'>
        <CardContainer direction={''}>
          {/* 카드를 감싼 div */}
          <div className='flex flex-row md:flex-col lg:flex-col gap-[15px] justify-start md:items-start ml-[15px]'>
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
        <div className='flex flex-col items-center text-center gap-9 pt-32 pb-10'>
          <UpsideAnimation>
            <div className='flex flex-col gap-5'>
              <div className='text-white text-base md:text-xl lg:text-xl'>당신의 문해력 지킴이,</div>
              <div className='text-white font-Ansungtangmyun text-5xl md:text-7xl lg:text-7xl'>심심한 사과</div>
            </div>
          </UpsideAnimation>
          <Link href={'/login'}>
            <div
              className='w-[150px] h-[50px] md:w-[215px] lg:w-[215px] md:h-[60px] lg:h-[60px] cursor-pointer bg-ourBlack flex justify-between items-center rounded-full text-white px-7 duration-[0.2s]
          hover:bg-ourBlack/70'
            >
              <div>시작하기</div>
              <div>→</div>
            </div>
          </Link>
        </div>
        <CardContainer direction={'upside'}>
          {/* 카드를 감싼 div */}
          <div className='flex flex-row md:flex-col-reverse lg:flex-col-reverse gap-[15px] items-end mr-[15px] absolute bottom-full'>
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
          <div className='flex flex-row md:flex-col-reverse lg:flex-col-reverse mt-[15px] gap-[15px] items-end mr-[15px]'>
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
            <div className='mb-2 font-bold text-base md:text-xl lg:text-xl text-ourTheme'>다음과 같은 상황,</div>
            <div className='font-bold text-2xl md:text-4xl lg:text-4xl text-ourBlack'>한 번쯤 겪어보지 않으셨나요?</div>
          </div>
        </UpsideAnimation>
        <div className='relative top-24 ping flex flex-col gap-5 justify-center px-5 md:px-28 md:flex-row items-center'>
          <SituationCard svg={'situation1'} content={'길다 싶으면 세줄 요약부터 찾기'} />
          <SituationCard svg={'situation2'} content={'한 문장을 읽고 또 읽기'} />
          <SituationCard svg={'situation3'} content={'대충 이런 말이겠거니 넘어가기'} />
          <SituationCard svg={'situation4'} content={`말할 때 '그거 있잖아' 반복하기`} />
        </div>
      </div>
      <div className='px-5 md:px-10 lg:px-44 pt-36 flex flex-col justify-center gap-5 md:gap-28 lg:gap-28'>
        <div className='text-center font-semibold text-base md:text-xl lg:text-xl'>
          이런 문해력 고민{' '}
          <mark className='bg-ourGreen/30 mr-1'>
            <span className='font-Ansungtangmyun text-base md:text-3xl lg:text-3xl text-ourTheme'>심심한 사과</span>
          </mark>
          에서 해결해보세요!
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 flex flex-col gap-10 items-center md:items-start lg:items-start justify-center'>
              <div className='text-ourBlue font-bold text-base md:text-xl lg:text-xl'>난이도별, 관심사별</div>
              <div className='font-bold text-3xl md:text-5xl lg:text-5xl flex flex-col gap-2'>
                <span>매일 새로운</span>
                <span>개인 맞춤 문제</span>
              </div>
              <ul className='text-ourDarkGray list-disc ml-4 text-sm md:text-base lg:text-base'>
                <li>개인별 문해력 능력치에 따른 학습 추천</li>
                <li>추론 능력, 인지 능력, 어휘, 읽기 속도, 읽기 정확도</li>
                <li>각 능력을 기를 수 있는 다양한 문제</li>
              </ul>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 relative'>
              <Image fill src={`/about/explain1.svg`} loading='eager' alt='' priority />
            </div>
          </div>
        </UpsideAnimation>
        <div className='w-full flex flex-col-reverse gap-0 md:gap-14 lg:gap-14 md:flex-row lg:flex-row justify-center'>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <LeftSideAnimation>
              <div className='w-full h-80 relative'>
                <Image fill src={`/about/explain2.svg`} loading='eager' alt='' priority />
              </div>
            </LeftSideAnimation>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <RightSideAnimation>
              <div className='w-full h-80 flex flex-col gap-10 items-center md:items-start lg:items-start'>
                <div className='text-ourBlue font-bold text-base md:text-xl lg:text-xl'>나의 요약 실력</div>
                <div className='font-bold text-3xl md:text-5xl lg:text-5xl flex flex-col gap-2'>
                  <span>짧은 글을 읽고 요약하고</span>
                  <span>모범 답안과의</span>
                  <span>유사도를 확인하세요</span>
                </div>
                <ul className='text-ourDarkGray list-disc ml-4 text-sm md:text-base lg:text-base'>
                  <li>AI가 요약한 모범 답안 확인</li>
                  <li>내 답안과 모범 답안과의 유사도 분석</li>
                </ul>
              </div>
            </RightSideAnimation>
          </div>
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 flex flex-col gap-10 items-center md:items-start lg:items-start justify-center'>
              <div className='text-ourBlue font-bold text-base md:text-xl lg:text-xl'>모든 학년별, 수준별</div>
              <div className='font-bold text-3xl md:text-5xl lg:text-5xl  flex flex-col gap-2'>
                <span>다양한 주제 지문들로</span>
                <span>읽기 능력 상승!</span>
              </div>
              <ul className='text-ourDarkGray list-disc ml-4 text-sm md:text-base lg:text-base'>
                <li>고등 수준 5개 대주제의 비문학 지문</li>
                <li>인문, 사회, 과학, 기술, 예술</li>
                <li>다양한 문제 유형에 대한 피드백과 해설</li>
              </ul>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80 relative'>
              <Image fill src={`/about/explain3.svg`} loading='eager' alt='' priority />
            </div>
          </div>
        </UpsideAnimation>
        <div className='w-full flex flex-col-reverse gap-0 md:gap-14 lg:gap-14 md:flex-row lg:flex-row justify-center'>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <LeftSideAnimation>
              <div className='w-full h-80 relative'>
                <Image fill src={`/about/explain4.svg`} loading='eager' alt='' priority />
              </div>
            </LeftSideAnimation>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2'>
            <RightSideAnimation>
              <div className='w-full h-80 flex flex-col gap-10 items-center md:items-start lg:items-start'>
                <div className='text-ourBlue font-bold text-base md:text-xl lg:text-xl'>매달 성장하는 나</div>
                <div className='font-bold text-3xl md:text-5xl lg:text-5xl flex flex-col gap-2'>
                  <span>향상된 나의 능력치와</span>
                  <span>매달 학습 기록 확인</span>
                </div>
                <ul className='text-ourDarkGray list-disc ml-4 text-sm md:text-base lg:text-base'>
                  <li>그래프를 통한 내 능력치와 강점, 약점</li>
                  <li>달력에서 바로 확인하는 내 학습 기록</li>
                </ul>
              </div>
            </RightSideAnimation>
          </div>
        </div>
        <UpsideAnimation>
          <div className='w-full flex flex-col gap-5 md:flex-row lg:flex-row justify-center'>
            <div className='w-full  md:w-1/2 lg:w-1/2 h-80 flex flex-col gap-10 items-center md:items-start lg:items-start justify-center'>
              <div className='text-ourBlue font-bold text-base md:text-xl lg:text-xl'>문해력의 기초, 어휘!</div>
              <div className='font-bold text-3xl md:text-5xl lg:text-5xl flex flex-col gap-2'>
                <span>대결을 통한</span>
                <span>재밌는 단어 학습</span>
              </div>
              <ul className='text-ourDarkGray list-disc ml-4 text-sm md:text-base lg:text-base'>
                <li>단어를 알면 문장 이해력이 올라가고</li>
                <li>단어를 알면 표현력도 올라가요</li>
              </ul>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 h-80   relative'>
              <Image fill src={`/about/explain5.svg`} loading='eager' alt='' priority />
            </div>
          </div>
        </UpsideAnimation>
      </div>

      <div className='mt-28 py-36 bg-ourBlue text-white'>
        <UpsideAnimation>
          <div className='text-center flex flex-col items-center'>
            <div>
              <span className='font-Ansungtangmyun text-3xl text-white'>심심한 사과</span> 가 준비한 다양한 컨텐츠, 지금
              바로 시작해보세요!
            </div>
            <Link href={'/login'}>
              <div
                className='pt-7 pb-3 px-10 text-ourBlack cursor-pointer border-0 border-b-4 border-ourBlack flex gap-10 duration-[0.2s]
          hover:border-ourTheme hover:text-white '
              >
                <div>시작하기</div>
                <div>→</div>
              </div>
            </Link>
          </div>
        </UpsideAnimation>
      </div>
    </div>
  );
}
