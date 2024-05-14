'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameWaitStore } from '@/stores/game-wait';
import { useGameScoreStore } from '@/stores/game-score';
import { useEffect } from 'react';
import instance from '@/utils/interceptor';

type RequestItem = {
  ranking: number;
  userId: 3;
};

type ResponseItem = {
  ranking: number;
  userNickname: string;
  rating: number;
  diff: number;
};

const postGameResult = async (playerScores: RequestItem[]) => {
  const response = await instance.post<{ data: { ResultList: ResponseItem[] } }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/game-service/results`,
    {
      resultReqList: playerScores,
    }
  );
  return response;
};

export default function GameResultsModal() {
  const { resultModalIsShow, setResultModalIsShow } = useGameRoomStore();
  const { selectedRoom } = useGameWaitStore();
  const { clearScore, players } = useGameScoreStore();

  useEffect(() => {
    console.log('나왔다');
    let copyPlayers = [...players];
    // 점수별 내림차순 정렬 => 순위...
    copyPlayers.sort((a, b) => b.score - a.score);
    console.log('copyPlayers', copyPlayers);
    let rank = 1;
    const requestarr = players.map((player, idx) => {
      if (idx === 0) return { ranking: rank, userId: player.id };
      else {
        if (players[idx - 1].score !== player.score) rank++;
        return {
          ranking: rank,
          userId: player.id,
        };
      }
    });
    console.log('requestarr', requestarr);
  }, []);
  return (
    <>
      <div className='z-30 rounded-md absolute top-0 left-0 w-full h-screen bg-ourBlack/30 flex justify-center items-center'>
        <div className='gap-7 w-1/2 md:w-3/5 lg:w-2/5 h-2/5 bg-ourLightGray rounded-xl flex flex-col justify-center items-center'>
          <div className='flex flex-row items-baseline gap-1 justify-center'>
            <div className='text-ourTheme font-bold text-2xl w-1/3 truncate'>{selectedRoom?.roomName}</div>
            <div className='font-bold text-xl'>에 입장</div>
          </div>

          <div
            className={`px-7 py-2 bg-ourTheme rounded-full text-white cursor-pointer`}
            onClick={() => {
              setResultModalIsShow(false);
              clearScore();
            }}
          >
            확인
          </div>
        </div>
      </div>
    </>
  );
}
