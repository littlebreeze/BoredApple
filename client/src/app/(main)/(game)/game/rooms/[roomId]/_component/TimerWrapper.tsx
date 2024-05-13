'use client';

import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect } from 'react';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  const {
    timer,
    isGaming,
    startRound,
    isGameRoundInProgress,
    setIsGameRoundInProgress,
    roundCount,
    currentRound,
    setCurrentRound,
    endGame,
  } = useWebsocketStore();

  useEffect(() => {
    if (!isGaming || timer > 30) return;

    if (isGameRoundInProgress && timer === 0) {
      setIsGameRoundInProgress();
      if (currentRound < roundCount) {
        setCurrentRound();
        setTimeout(() => {
          startRound(roomId);
        }, 3000);
      } else {
        endGame(roomId);
      }
    }
  }, [
    timer,
    isGaming,
    isGameRoundInProgress,
    roundCount,
    currentRound,
    roomId,
    setIsGameRoundInProgress,
    setCurrentRound,
    startRound,
    endGame,
  ]);

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
