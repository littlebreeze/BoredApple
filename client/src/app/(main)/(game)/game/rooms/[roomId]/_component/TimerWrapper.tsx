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
  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>남은 시간</div>
        <div className='text-center text-2xl'>{timer}</div>
      </div>
    </>
  );
}
