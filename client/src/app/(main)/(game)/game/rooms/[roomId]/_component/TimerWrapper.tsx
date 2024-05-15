'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect } from 'react';
import effectSound from '@/utils/effectSound';

import clockSound from '@/../public/sound/clock.mp3';
import timerSound from '@/../public/sound/timer.mp3';
import hintSound from '@/../public/sound/hint.mp3';
import correctSound from '@/../public/sound/correct.mp3';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  // 효과음
  const clockES = effectSound(clockSound);
  const timerES = effectSound(timerSound);
  const hintES = effectSound(hintSound);
  const correctES = effectSound(correctSound);

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

  // 효과음
  useEffect(() => {
    if (timer == 33) clockES.play();
    if (timer == 32) clockES.play();
    if (timer == 31) clockES.play();
    if (timer == 20) hintES.play();
    if (timer == 10) hintES.play();
    if (timer == 5) timerES.play();
    if (timer == 0 || isCorrectAnswer) timerES.stop();
    if (isCorrectAnswer) correctES.play();
  }, [timer, isCorrectAnswer]);

  if (!isGaming || timer > 30) return null;

  const formattedTimer = timer.toString().padStart(2, '0');

  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>남은 시간</div>
        <div className={`text-center text-6xl font-Ansungtangmyun mt-2 ${timer <= 5 ? 'text-[#FF0000]' : ''}`}>
          {formattedTimer}
        </div>
        {timer > 20 ? (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>곧 글자 수 힌트가 나와요</div>
        ) : timer > 10 ? (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>곧 초성 힌트가 나와요</div>
        ) : (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>&nbsp;</div>
        )}
      </div>
    </>
  );
}
