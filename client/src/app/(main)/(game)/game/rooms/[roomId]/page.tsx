'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';
import GameScoreBoard from './_component/GameScoreBoard';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useEffect } from 'react';
import QuizWrapper from './_component/QuizWrapper';
import TimerWrapper from './_component/TimerWrapper';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useGameRoomInfo } from '@/queries/get-room-info';
import GameResultsModal from './_component/GameResultsModal';

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

  const router = useRouter();
  const { connect, disconnect, stompClient } = useWebsocketStore();
  // const { data: roomData, isLoading: getLoading, isError, error } = useGameRoomInfo(parseInt(roomId));
  const { setGameRoomInfo, resultModalIsShow } = useGameRoomStore();

  useEffect(() => {
    console.log(roomPlayerRes);
    // myUserId 없으면 game으로 보내기
    if (!myUserId) router.replace('/game');
  }, []);

  // useEffect(() => {
  //   if (!stompClient) {
  //     connect(roomId);
  //     if (roomData) setGameRoomInfo(roomData?.data.data);
  //   }
  // }, [roomId, connect, disconnect, roomData]);

  useEffect(() => {
    // unMount 될 때 disconnect
    return () => {
      console.log('나가면서메세지보내기');
      disconnect({
        type: 'EXIT',
        roomId: storedRoomId!,
        sender: myNickname!,
        senderId: myUserId!,
        message: '나갑니다',
      });
    };
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {resultModalIsShow && <GameResultsModal />}
      <div className='relative flex justify-center w-full gap-10 -top-8'>
        {/* 점수판 */}
        <div className='w-1/6'>
          <GameScoreBoard />
          <button
            className='w-full p-3 mt-3 text-white rounded-3xl bg-[#FF0000]'
            onClick={() => {
              router.back();
            }}
          >
            게임나가기
          </button>
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
      <div className='w-1/2 h-60'>
        {/* 채팅창 */}
        <ChatWrapper roomId={Number(roomId)} />
      </div>
    </div>
  );
}
