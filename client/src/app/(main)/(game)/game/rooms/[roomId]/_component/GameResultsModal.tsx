'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameWaitStore } from '@/stores/game-wait';
import { useGameScoreStore } from '@/stores/game-score';
import { useEffect, useState } from 'react';
import instance from '@/utils/interceptor';
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
  const { resultModalIsShow, setResultModalIsShow, roomId } = useGameRoomStore();
  const {} = useGameWaitStore();
  const { clearScore, players } = useGameScoreStore();
  const [gameResults, setGameResults] = useState<ResponseItem[]>();
  const { stompClient, gameResult } = useWebsocketStore();

  useEffect(() => {
    console.log('나왔다');
    let copyPlayers = [...players];
    // 점수별 내림차순 정렬 => 순위...
    copyPlayers.sort((a, b) => b.score - a.score);
    // console.log('copyPlayers', copyPlayers);
    let rank = 1;
    const requestarr: RequestItem[] = players.map((player, idx) => {
      if (idx === 0) return { ranking: rank, userId: player.id };
      else {
        if (players[idx - 1].score !== player.score) rank++;
        return {
          ranking: rank,
          userId: player.id,
        };
      }
    });
    stompClient?.publish({
      destination: `/pub/ws/result/rooms/${roomId}/send`,
      body: JSON.stringify({
        resultReqList: [
          { ranking: 1, userId: 1 },
          { ranking: 2, userId: 7 },
          { ranking: 2, userId: 11 },
        ],
      }),
    });
    console.log('#####게임결과', gameResult);
    setGameResults([
      { ranking: 1, userNickname: '뛰뛰', rating: 1515, diff: 15 },
      { ranking: 2, userNickname: '뿅뿅', rating: 1500, diff: 0 },
      { ranking: 3, userNickname: '정윤', rating: 1545, diff: -15 },
    ]);

    return setResultModalIsShow(false);
  }, [stompClient?.active, stompClient?.connected]);

  useEffect(() => {
    console.log(gameResult);
  }, [gameResult]);
  return (
    <>
      <div className='z-30 rounded-md absolute top-0 left-0 w-full h-screen bg-ourBlack/30 flex justify-center items-center'>
        <div className='gap-7 w-2/3 h-2/3 bg-ourLightGray rounded-xl flex flex-col justify-center items-center'>
          <div className='flex'>
            {/* <div>{selectedRoom?.roomName}</div> */}
            <div className=''>가나다라마사아자차카</div>
            <div>방 게임 결과</div>
          </div>
          <div className='bg-yellow-200'>
            {gameResults?.map((result, idx) => (
              <div key={idx}>{result.ranking}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
