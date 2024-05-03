'use client';
import Link from 'next/link';
import { useState } from 'react';

type RoomInfo = {
  roomId: number;
  title: string;
  manager: string;
  current: number;
  limit: number;
  isLocked: boolean;
  quiz: number;
};

type Props = {
  roomInfo: RoomInfo;
};

export default function GameRoomItem({ roomInfo }: Props) {
  const [roomId, setRoomId] = useState<number>(1);
  return (
    <>
      {/* 잠겨있으면 모달 띄우기...아악 */}
      <Link href={`game/rooms/${roomId}`}>
        <div className='bg-white/80 rounded-xl h-28 cursor-pointer flex flex-row p-3 md:px-5 lg:px-5'>
          <div className='w-1/5 font-semibold text-ourDarkGray text-lg mt-1'>
            {String(roomInfo.roomId).padStart(3, '0')}
          </div>
          <div className='w-3/5 flex flex-col justify-between'>
            <div className='font-semibold text-2xl'>{roomInfo.title}</div>
            <div className='text-ourDarkGray text-sm'>{roomInfo.manager}의 방</div>
          </div>
          <div className='w-1/5 flex flex-col justify-between items-end'>
            <div className='flex flex-row gap-1 items-baseline mt-1'>
              <div className='font-semibold text-sm'>
                {roomInfo.current}/{roomInfo.limit}
              </div>
              <div>{roomInfo.isLocked ? '잠' : '열'}</div>
            </div>
            <div>{roomInfo.quiz}문제</div>
          </div>
        </div>
      </Link>
    </>
  );
}
