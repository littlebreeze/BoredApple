'use client';

import { useParams } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';
import GameScoreBoard from './_component/GameScoreBoard';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useEffect } from 'react';
import QuizWrapper from './_component/QuizWrapper';
import TimerWrapper from './_component/TimerWrapper';
import { useWebsocketStore } from '@/stores/websocketStore';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    myNickname,
    myUserId,
    roomId: storedRoomId,
    maxNum,
    quizCount,
    creatorId,
    roomPlayerRes,
  } = useGameRoomStore();

  const { connect, disconnect } = useWebsocketStore();
  useEffect(() => {
    console.log(roomPlayerRes);
    return () => {
      disconnect({
        type: 'EXIT',
        roomId: storedRoomId!,
        sender: myNickname!,
        senderId: myUserId!,
        message: '나갑니다',
      });
    };
  }, [roomId, connect, disconnect]);

  // useEffect(() => {
  //   // unMount 될 때 disconnect

  // }, [roomId, connect, disconnect]);

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex justify-center w-full gap-10 -top-8'>
        {/* 점수판 */}
        <div className='w-1/6'>
          <GameScoreBoard />
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
        <ChatWrapper roomId={Number(roomId)} />
      </div>
    </div>
  );
}
