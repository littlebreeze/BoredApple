import type { Metadata } from 'next';
import Header from '@/app/_common/Header';
import Card from './_component/Card';
import CardContainer from './_component/CardContainer';
import SituationCard from './_component/SituationCard';
import IntroduceWrapper from './_component/IntroduceWrapper';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지키미',
  description: '문해력 학습 서비스 심심한 사과의 소개 페이지',
};

export default function Page() {
  return (
    <div className='bg-white'>
      <Header />
      <div className='bg-ourTheme pt-[140px] pb-[50px] overflow-hidden'>
        <div className='flex flex-col items-center text-center gap-9'>
          <div className='flex flex-col gap-5'>
            <div className='text-white text-xl'>당신의 문해력 지키미,</div>
            <div className='text-white font-Ansungtangmyun text-7xl'>심심한 사과</div>
          </div>
          <div
            className=' w-[215px] h-[60px] cursor-pointer  bg-ourBlack flex justify-between items-center rounded-full text-white px-7 duration-[0.2s]
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
      <div className='py-10 bg-ourBlue/5'>
        <div className='text-center'>
          <div>다음과 같은 상황,</div>
          <div>한번쯤 겪어보지 않으셨나요?</div>
        </div>
        <div className='relative top-16 ping flex flex-col gap-5 justify-center px-5 md:px-28 md:flex-row'>
          <SituationCard />
          <SituationCard />
          <SituationCard />
          <SituationCard />
        </div>
      </div>
      <div className='px-5 pt-20 flex flex-col justify-center gap-5'>
        <IntroduceWrapper />
        <div className='beside'>좌우스르륵</div>
        <div className='upside'>위로스르륵</div>
        <div className='beside'>좌우스르륵</div>
        <div className='upside'>위로스르륵</div>
      </div>
      <div className='upside'>단체도입 배경색</div>
      <div className='ping'>업적 - 호버 디용</div>
      <div className='upside'>자주 묻는 질문</div>
    </div>
  );
}
