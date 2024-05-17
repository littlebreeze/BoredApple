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
  const {
    startGame,
    isGaming,
    timer,
    roundCount,
    currentRound,
    setRoundCount,
    quiz,
    answer,
    isGameRoundInProgress,
    isCorrectAnswer,
  } = useWebsocketStore();
  const { quizCount, myUserId, creatorId } = useGameRoomStore();

  useEffect(() => {
    setRoundCount(quizCount as number);
  }, []);

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
        {isCorrectAnswer ? answer[idx] : timer > 20 ? '' : timer === 0 ? answer[idx] : createHint2(answer)[idx]}
      </div>
    ));
  };

  // 정답 띄워주기
  const viewAnswer = (length: number) => {
    return Array.from({ length }, (_, idx) => (
      <div
        key={idx}
        className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl font-bold'
      >
        {answer[idx]}
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
          {isGaming && isGameRoundInProgress ? (
            timer == 43 ? (
              <Image
                width={80}
                src={count_3}
                alt='카운트-3'
              />
            ) : timer == 42 ? (
              <Image
                width={80}
                src={count_2}
                alt='카운트-2'
              />
            ) : timer == 41 ? (
              <Image
                width={80}
                src={count_1}
                alt='카운트-1'
              />
            ) : (
              quiz
            )
          ) : (
            '게임 대기 중'
          )}
        </div>
      </div>
      <div className='flex justify-center h-16 gap-3 mt-5'>
        {isGaming ? (
          isGameRoundInProgress ? (
            isCorrectAnswer || timer == 0 ? (
              viewAnswer(answer.length)
            ) : (
              timer <= 30 && createHint1(answer.length)
            )
          ) : (
            '곧 다음 문제가 나옵니다!'
          )
        ) : myUserId === creatorId ? (
          <button
            className='w-1/2 text-3xl text-white rounded-3xl bg-ourRed'
            onClick={() => startGame(roomId)}
          >
            게임시작
          </button>
        ) : (
          <div>방장이 게임시작 버튼을 누르면 게임이 시작됩니다.</div>
        )}
      </div>
    </>
  );
}
