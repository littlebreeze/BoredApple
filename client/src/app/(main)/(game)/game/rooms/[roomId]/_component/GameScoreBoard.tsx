'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameScoreStore } from '@/stores/game-score';
import { useEffect } from 'react';

class MemberScore {
  public score: number;
  public nickname: string;
  public id: number;

  constructor(score: number, nickname: string, id: number) {
    this.score = score;
    this.nickname = nickname;
    this.id = id;
  }
}

type Res = {
  userId: number;
  nickname: string;
};

export default function GameScoreBoard() {
  const { players, setPlayers } = useGameScoreStore();
  const { myNickname, myUserId, roomPlayerRes, creatorId } = useGameRoomStore();

  useEffect(() => {
    const res: Res[] = roomPlayerRes;
    let scoreList: MemberScore[] =
      res?.map((re: { userId: number; nickname: string }, idx: number) => new MemberScore(0, re.nickname, re.userId)) ??
      [];
    scoreList.push(new MemberScore(0, myNickname!, myUserId!));
    setPlayers(scoreList);
  }, []);

  return (
    <div className='flex flex-col gap-1 px-5 py-3 bg-white rounded-xl'>
      <div className='text-center'>점수</div>
      {players?.map((player, idx) => (
        <div key={idx} className='flex justify-between'>
          <div className='font-bold'>
            {player.nickname}
            <span className='font-normal'>{player.id === creatorId && ' ♛'}</span>
          </div>
          <div>{player.score}</div>
        </div>
      ))}
    </div>
  );
}
