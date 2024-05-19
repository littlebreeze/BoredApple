'use client';

import { useEffect, useState } from 'react';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameScoreStore } from '@/stores/game-score';
import { useWebsocketStore } from '@/stores/websocketStore';

type RequestItem = {
  ranking: number;
  userId: number;
};

type ResponseItem = {
  ranking: number;
  userNickname: string;
  rating: number;
  diff: number;
};

export default function GameResultsModal() {
  const { setResultModalIsShow, roomId, roomName, myUserId, creatorId } = useGameRoomStore();
  const { players, clearScore } = useGameScoreStore();
  const { stompClient, gameResult } = useWebsocketStore();

  useEffect(() => {
    let copyPlayers = [...players];

    // 점수별 내림차순 정렬 => 순위...
    copyPlayers.sort((a, b) => b.score - a.score);

    let rank = 1;
    const requestarr: RequestItem[] = copyPlayers.map((player, idx) => {
      if (idx === 0) return { ranking: rank, userId: player.id };
      else {
        if (copyPlayers[idx - 1].score !== player.score) rank++;
        return {
          ranking: rank,
          userId: player.id,
        };
      }
    });

    // 방장만 결과 요청 발행
    if (myUserId === creatorId) {
      stompClient?.publish({
        destination: `/pub/ws/result/rooms/${roomId}/send`,
        body: JSON.stringify({ resultReqList: requestarr }),
      });
    }
  }, [stompClient?.active, stompClient?.connected]);

  useEffect(() => {}, [gameResult]);

  useEffect(() => {
    return () => clearScore();
  }, []);

  return (
    <>
      <div className='z-30 rounded-md absolute top-0 left-0 w-full h-screen bg-ourBlack/30 flex justify-center items-center'>
        <div className='relative w-1/2 h-2/3 bg-ourLightGray rounded-xl flex flex-col items-center py-10 px-20'>
          <div className='absolute top-3 right-3 cursor-pointer' onClick={() => setResultModalIsShow(false)}>
            <svg width='25' height='25' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M244.324 224.426C246.966 227.068 248.45 230.651 248.45 234.387C248.45 238.123 246.966 241.706 244.324 244.348C241.682 246.989 238.099 248.474 234.363 248.474C230.627 248.474 227.044 246.989 224.402 244.348L150 169.922L75.5742 244.324C72.9324 246.966 69.3493 248.45 65.6133 248.45C61.8772 248.45 58.2941 246.966 55.6523 244.324C53.0105 241.682 51.5264 238.099 51.5264 234.363C51.5264 230.627 53.0105 227.044 55.6523 224.402L130.078 150L55.6758 75.5742C53.034 72.9324 51.5498 69.3493 51.5498 65.6133C51.5498 61.8772 53.034 58.2941 55.6758 55.6523C58.3176 53.0105 61.9006 51.5264 65.6367 51.5264C69.3728 51.5264 72.9558 53.0105 75.5976 55.6523L150 130.078L224.426 55.6406C227.068 52.9988 230.651 51.5146 234.387 51.5146C238.123 51.5146 241.706 52.9988 244.348 55.6406C246.989 58.2824 248.474 61.8655 248.474 65.6015C248.474 69.3376 246.989 72.9207 244.348 75.5625L169.922 150L244.324 224.426Z'
                fill='#202632'
              />
            </svg>
          </div>
          <div className='flex flex-col justify-center text-center gap-2 mb-5'>
            <div className='text-xl font-bold'>ꔛ 대결 결과 ꔛ</div>
            <div className='font-Ansungtangmyun text-4xl bg-ourBlack text-white py-2 px-7 rounded-md'>{roomName}</div>
          </div>
          <div className='flex w-full text-center gap-2 mb-3 text-ourDarkGray font-bold'>
            <div className='w-1/5 bg-white/70 rounded-s-full py-1'>순 위</div>
            <div className='w-2/5 bg-white/70 py-1'>별 명</div>
            <div className='w-2/5 bg-white/70 rounded-e-full py-1'>레이팅</div>
          </div>
          <div className='w-full text-center bg-white/50 rounded-2xl pt-2'>
            {gameResult?.map((result, idx) => (
              <div key={idx} className='flex w-full mb-2 font-bold text-lg'>
                <div className='w-1/5 font-Ansungtangmyun'>{result.ranking}</div>
                <div className='w-2/5'>{result.userNickname}</div>
                <div className='w-2/5 flex justify-evenly'>
                  <div className='w-1/4 font-Ansungtangmyun'>{result.rating}</div>
                  <div
                    className={`w-1/4 font-Ansungtangmyun ${result.diff > 0 && 'text-red-500'} ${
                      result.diff < 0 && 'text-ourTheme'
                    }`}
                  >
                    ({result.diff > 0 && '+'}
                    {result.diff})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
