import Header from '@/app/_common/Header';
import Card from './_component/Card';

export default function Page() {
  return (
    <div>
      <Header />
      <div className='bg-ourTheme pt-[140px] pb-[50px] overflow-hidden'>
        <div className='flex flex-col items-center text-center gap-9'>
          <div className='flex flex-col gap-5'>
            <div className='text-white text-xl'>당신의 문해력 지키미,</div>
            <div className='text-white font-Ansungtangmyun text-7xl'>심심한 사과</div>
          </div>
          <div
            className=' w-[215px] h-[60px] cursor-pointer my- bg-ourBlack flex justify-between items-center rounded-full text-white px-7 duration-[0.2s]
          hover:bg-ourBlue'
          >
            <div>시작하기</div>
            <div>→</div>
          </div>
        </div>
        {/* 움직일 div */}
        <div className='w-full block mt-[104px] mb-[60px]'>
          {/* 카드를 감싼 div */}
          <div className='flex flex-row gap-[15px] justify-start items-stretch ml-[15px]'>
            <Card num={1} />
            <Card num={2} />
            <Card num={3} />
            <Card num={4} />
            <Card num={5} />
          </div>
        </div>
      </div>
      <div className='bg-ourBlue h-[400px]'>b</div>
      <div className='bg-green-200'>c</div>
    </div>
  );
}
