'use client';

import { useWebsocketStore } from '@/stores/websocketStore';
import Image from 'next/image';

import count_1 from '@/../public/game/count-1.svg';
import count_2 from '@/../public/game/count-2.svg';
import count_3 from '@/../public/game/count-3.svg';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useEffect } from 'react';

// 힌트 - 초성뽑기
const INITIAL_CONSONANTS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

export default function QuizWrapper({ roomId }: { roomId: string }) {
  const { startGame, startTimer, isGaming, timer, roundCount, currentRound, setRoundCount } = useWebsocketStore();
  const { quizCount } = useGameRoomStore();

  useEffect(() => {
    setRoundCount(quizCount as number);
  }, []);

  // 더미
  const quiz: string = '가렴주구';

  // 힌트 - 초성뽑기
  const createHint2 = (text: string) => {
    let result = '';

    for (let char of text) {
      if (/[가-힣]/.test(char)) {
        const unicode = char.charCodeAt(0) - 0xac00;
        const initialConsonantIndex = Math.floor(unicode / 588);
        result += INITIAL_CONSONANTS[initialConsonantIndex];
      } else {
        result += char;
      }
    }
    return result;
  };

  // 힌트 - 글자수
  const createHint1 = (length: number) => {
    return Array.from({ length }, (_, idx) => (
      <div
        key={idx}
        className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'
      >
        {timer > 10 ? '' : timer === 0 ? quiz[idx] : createHint2(quiz)[idx]}
      </div>
    ));
  };

  return (
    <>
      <div className='flex flex-col w-full h-56 p-3 bg-white rounded-xl'>
        <div>
          {currentRound} / {roundCount}
        </div>
        <div className='flex items-center justify-center flex-1 px-5 text-lg font-semibold font-Batang'>
          {isGaming ? (
            timer == 33 ? (
              <Image
                width={80}
                src={count_3}
                alt='카운트-3'
              />
            ) : timer == 32 ? (
              <Image
                width={80}
                src={count_2}
                alt='카운트-2'
              />
            ) : timer == 31 ? (
              <Image
                width={80}
                src={count_1}
                alt='카운트-1'
              />
            ) : (
              '세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음. 세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.'
            )
          ) : (
            '게임 대기 중'
          )}
        </div>
      </div>
      <div className='flex justify-center h-16 gap-3 mt-5'>
        {!isGaming ? (
          <button
            className='w-1/2 text-3xl text-white rounded-3xl bg-ourRed'
            onClick={() => {
              startGame(roomId);
              startTimer(33);
              console.log('시작');
            }}
          >
            게임시작
          </button>
        ) : timer > 20 ? (
          <></>
        ) : (
          createHint1(quiz.length)
        )}
      </div>
    </>
  );
}
