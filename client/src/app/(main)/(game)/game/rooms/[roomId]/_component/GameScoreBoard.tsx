'use client';

import { useGameRoomStore } from '@/stores/game-room-info';

export default function GameScoreBoard() {
  const { roomPlayerRes } = useGameRoomStore();

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
