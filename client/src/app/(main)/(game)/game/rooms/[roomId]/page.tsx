'use client';

import { useParams } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';
import QuizWrapper from './_component/QuizWrapper';
import TimerWrapper from './_component/TimerWrapper';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect } from 'react';
import { useRoomStore } from '@/stores/roomStore';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();
  const { connect, disconnect } = useWebsocketStore();
  const { getRoomById } = useRoomStore();
  console.log(getRoomById(roomId));

  useEffect(() => {
    // roomId 있으면 연결
    if (roomId) connect(roomId);
    // unMount 될 때 disconnect
    return () => {
      disconnect();
    };
  }, [roomId, connect, disconnect]);

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex justify-center w-full gap-10 -top-8'>
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
          <QuizWrapper roomId={roomId} />
        </div>
        {/* 시간 */}
        <div className='w-1/6'>
          <TimerWrapper roomId={roomId} />
        </div>
      </div>
      <div className='w-2/3 h-60'>
        {/* 채팅창 */}
        <ChatWrapper roomId={roomId} />
      </div>
    </div>
  );
}
