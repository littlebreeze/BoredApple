import { NextPage } from 'next';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: '존재하지 않는 페이지입니다',
};

const NotFound: NextPage = () => {
  return (
    <div className='w-full h-screen flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:justify-evenly'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='flex flex-col gap-2'>
          <div className='font-bold text-lg md:text-2xl lg:text-2xl mb-2'>페이지를 찾을 수 없습니다.</div>
          <div className='text-sm md:text-base lg:text-base'>입력하신 주소를 다시 한번 확인해 주세요!</div>
          <div className='text-sm md:text-base lg:text-base'>존재하지 않는 주소를 입력하셨거나</div>
          <div className='text-sm md:text-base lg:text-base'>
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </div>
        </div>
        <div className='flex gap-3'>
          <Link href={'/'}>
            <div
              className='py-3 px-6 text-ourDarkGray cursor-pointer border-0 border-b-4 border-ourDarkGray flex gap-10 duration-[0.2s]
          hover:border-ourBlack hover:text-ourBlack hover:bg-ourGray text-sm md:text-base lg:text-base'
            >
              <div>서비스 소개</div>
              <div>→</div>
            </div>
          </Link>
          <Link href={'/login'}>
            <div
              className='py-3 px-6 text-ourDarkGray cursor-pointer border-0 border-b-4 border-ourDarkGray flex gap-10 duration-[0.2s]
          hover:border-ourBlack hover:text-ourBlack hover:bg-ourGray text-sm md:text-base lg:text-base'
            >
              <div>시작하기</div>
              <div>→</div>
            </div>
          </Link>
        </div>
      </div>

      <div className='bg-ourGreen/40 rounded-full p-16 md:p-20 lg:p-24 flex flex-col justify-center items-center gap-3'>
        <div className='text-ourTheme font-Ansungtangmyun text-5xl md:text-6xl lg:text-6xl mb-3'>심심하다</div>
        <div className='font-Batang font-bold'>1. (형) 마음의 표현 정도가 매우 깊고 간절하다.</div>
        <div className='font-Batang font-bold'>2. (형) 하는 일이 없어 지루하고 재미가 없다.</div>
        <div className='font-Batang font-bold'>3. (형) 음식 맛이 조금 싱겁다.</div>
      </div>
    </div>
  );
};

export default NotFound;
