'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect } from 'react';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  const {
    timer,
    isGaming,
    isGameRoundInProgress,
    isCorrectAnswer,
    setIsGameRoundInProgress,
    currentRound,
    roundCount,
    startRound,
    endGame,
  } = useWebsocketStore();

  const { myUserId, creatorId } = useGameRoomStore();

  useEffect(() => {
    if (!isGaming || timer > 30) return;

    if (isGameRoundInProgress && (isCorrectAnswer || timer === 0)) {
      setIsGameRoundInProgress();
      if (currentRound < roundCount) {
        const timeout = setTimeout(() => {
          if (myUserId === creatorId) startRound(roomId);
        }, 3000);
        return () => clearTimeout(timeout);
      } else if (currentRound >= roundCount) {
        //게임 끝나기 전에 결과..보여주기....
        if (myUserId === creatorId) endGame(roomId);
      }
    }
  }, [timer, isCorrectAnswer, isGaming, isGameRoundInProgress]);

  if (!isGaming || timer > 30) return null;

  const formattedTimer = timer.toString().padStart(2, '0');

  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>남은 시간</div>
        <div className='text-center text-6xl font-Ansungtangmyun mt-2'>{formattedTimer}</div>
        {timer > 20 ? (
          <div className='text-sm text-ourDarkGray'>곧 글자 수 힌트가 나와요</div>
        ) : timer > 10 ? (
          <div className='text-sm text-ourDarkGray'>곧 초성 힌트가 나와요</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
