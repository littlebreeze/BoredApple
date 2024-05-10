'use client';

import { useGameRoomStore } from '@/stores/game-room-info';
import { useEffect } from 'react';

export default function GameScoreBoard() {
  const { roomPlayerRes } = useGameRoomStore();
  useEffect(() => {
    if (roomPlayerRes!.length <= 0) {
      location.href = '/game';
    }
  }, []);
  return (
    <div className='flex flex-col gap-1 p-3 bg-white rounded-xl'>
      <div className='text-center'>점수</div>
      {roomPlayerRes?.map((player, idx) => (
        <div key={idx} className='flex justify-between'>
          <div>{player.nickname}</div>
          <div>-</div>
        </div>
      ))}
    </div>
  );
}
