'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function GameRoomItem() {
  const [roomId, setRoomId] = useState<number>(1);
  return (
    <>
      <Link href={`game/rooms/${roomId}`}>
        <div className='bg-white/80 rounded-xl h-28 cursor-pointer flex flex-row p-2'>
          <div className='w-1/5'>방번호</div>
          <div className='w-3/5 flex flex-col justify-between'>
            <div>제목</div>
            <div>방장의 방</div>
          </div>
          <div className='w-1/5 flex flex-col justify-between'>
            <div className='flex flex-row gap-1'>
              <div>인원</div>
              <div>잠금</div>
            </div>
            <div>문제수</div>
          </div>
        </div>
      </Link>
    </>
  );
}
