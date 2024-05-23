'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect, useState } from 'react';
import effectSound from '@/utils/effectSound';

import clockSound from '@/../public/sound/clock.mp3';
import timerSound from '@/../public/sound/timer.mp3';
import hintSound from '@/../public/sound/hint.mp3';
import correctSound from '@/../public/sound/correct.mp3';
import timeOut from '@/../public/sound/timeout.mp3';
import { useSoundControlStore } from '@/stores/sound-control';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  const { isPlaying } = useSoundControlStore();
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    if (isPlaying) setVolume(0.2);
    else setVolume(0);
  }, [isPlaying]);

  // 효과음
  const clockES = effectSound(clockSound, volume);
  const timerES = effectSound(timerSound, volume);
  const hintES = effectSound(hintSound, volume);
  const correctES = effectSound(correctSound, volume);
  const timeOutES = effectSound(timeOut, volume);

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
    if (!isGaming || timer > 40) return;

    if (isGameRoundInProgress && (isCorrectAnswer || timer === 0)) {
      setIsGameRoundInProgress();
      if (currentRound < roundCount) {
        const timeout = setTimeout(() => {
          if (myUserId === creatorId) startRound(roomId);
        }, 3000);
        return () => clearTimeout(timeout);
      } else if (currentRound >= roundCount) {
        //게임 끝나기 전에 결과..보여주기....
        if (myUserId === creatorId) {
          const timeout = setTimeout(() => {
            endGame(roomId);
          }, 3000);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [timer, isCorrectAnswer, isGaming, isGameRoundInProgress]);

  // 효과음
  useEffect(() => {
    if (timer === 43 || timer === 42 || timer === 41) clockES.play();
    if (timer === 30 || timer === 20) hintES.play();
    if (timer === 5 || timer === 4 || timer === 3 || timer === 2 || timer === 1) timerES.play();
    if (timer === 0) timeOutES.play();
    if (isCorrectAnswer) correctES.play();
  }, [timer, isCorrectAnswer]);

  if (!isGaming || timer > 40) return null;

  const formattedTimer = timer.toString().padStart(2, '0');

  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>남은 시간</div>
        <div className={`text-center text-6xl font-Ansungtangmyun mt-2 ${timer <= 5 ? 'text-[#FF0000]' : ''}`}>
          {formattedTimer}
        </div>
        {timer > 30 ? (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>곧 글자 수 힌트가 나와요</div>
        ) : timer > 20 ? (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>곧 초성 힌트가 나와요</div>
        ) : (
          <div className='text-sm text-ourDarkGray mt-3 text-center'>&nbsp;</div>
        )}
      </div>
    </>
  );
}
