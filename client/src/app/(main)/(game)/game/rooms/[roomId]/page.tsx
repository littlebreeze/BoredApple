'use client';

import { useParams } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex justify-center w-full gap-10 -z-50 -top-8'>
        {/* 점수판 */}
        <div className='w-1/6'>
          <div className='flex flex-col gap-1 p-3 bg-white rounded-xl'>
            <div className='text-center'>점수</div>
            <div className='flex justify-between'>
              <div>문해문어</div>
              <div>1</div>
            </div>
            <div className='flex justify-between'>
              <div>문해너구리</div>
              <div>3</div>
            </div>
          </div>
          <button className='w-full p-3 mt-3 text-white rounded-3xl bg-[#FF0000]'>게임나가기</button>
        </div>
        {/* 문제 및 힌트 */}
        <div className='w-1/2'>
          <div className='flex flex-col w-full h-56 p-3 bg-white rounded-xl'>
            <div>4 / 20</div>
            <div className='flex items-center justify-center flex-1 px-5 text-lg font-semibold font-Batang'>
              세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.
              세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.
            </div>
          </div>
          <div className='flex justify-center h-16 gap-3 mt-5'>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄹ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㅈ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
            {/* <button className='w-1/2 text-3xl text-white rounded-3xl bg-ourRed'>게임시작</button> */}
          </div>
        </div>
        {/* 시간 */}
        <div className='w-1/6'>
          <div className='flex flex-col items-center p-3 bg-white rounded-xl'>
            <div>남은 시간</div>
            <div>0:00</div>
          </div>
        </div>
      </div>
      <div className='w-2/3 h-60'>
        {/* 채팅창 */}
        <div className='h-full p-3 bg-ourLightGray rounded-xl'></div>
      </div>
    </div>
  );
}
