'use client';

import Image from 'next/image';

import rock from '@/../public/game/rock.svg';
import unRock from '@/../public/game/unrock.svg';
import { useGameRoomStore } from '@/stores/game-room-info';

export default function RoomInfoWrapper() {
  const { roomName, roomId, quizCount } = useGameRoomStore();

  const formattedRoomId = roomId?.toString().padStart(3, '0');
  return (
    <div className='flex flex-col gap-3 px-5 pt-3 pb-5 bg-white rounded-xl w-full'>
      <div className='font-Ansungtangmyun text-lg text-center'>{formattedRoomId}번 방</div>
      <div>
        <div className='font-Ansungtangmyun text-ellipsis'>
          방 제목 : <span>{roomName}</span>
        </div>
        <div className='font-Ansungtangmyun'>
          문제 수 : <span>{quizCount} 문제</span>
        </div>
      </div>
    </div>
  );
}
