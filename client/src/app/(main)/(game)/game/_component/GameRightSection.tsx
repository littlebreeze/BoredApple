'use client';
import { useState } from 'react';
import MakeRoomBtn from './MakeRoomBtn';
import GameRoomItem from './GameRoomItem';
import PagingBtn from './PagingBtn';
import QuickStartGameBtn from './QuickStartGameBtn';
import RefreshRoomsBtn from './RefreshRoomsBtn';

type RoomInfo = {
  roomId: number;
  title: string;
  manager: string;
  current: number;
  limit: number;
  isLocked: boolean;
  quiz: number;
};

const roomInfo: RoomInfo[] = [
  {
    roomId: 1,
    title: '문제! 풀자!',
    manager: '문해너구리',
    current: 2,
    limit: 6,
    isLocked: true,
    quiz: 20,
  },
  {
    roomId: 1,
    title: '문제! 풀자!',
    manager: '문해너구리',
    current: 2,
    limit: 6,
    isLocked: false,
    quiz: 20,
  },
  {
    roomId: 1,
    title: '문제! 풀자!',
    manager: '문해너구리',
    current: 2,
    limit: 6,
    isLocked: false,
    quiz: 20,
  },
  {
    roomId: 1,
    title: '문제! 풀자!',
    manager: '문해너구리',
    current: 2,
    limit: 6,
    isLocked: true,
    quiz: 20,
  },
  {
    roomId: 1,
    title: '문제! 풀자!',
    manager: '문해너구리',
    current: 2,
    limit: 6,
    isLocked: false,
    quiz: 20,
  },
];

export default function GameRightSection() {
  const [roomList, setRoomList] = useState<RoomInfo[]>(roomInfo);
  const generateRoomItems = (list: RoomInfo[]): (RoomInfo | undefined)[] => {
    let duplicatedList: (RoomInfo | undefined)[] = [];
    for (let idx = 0; idx < 6; idx++) {
      if (idx < roomList.length) duplicatedList.push(list[idx]);
      else duplicatedList.push(undefined);
    }
    return duplicatedList;
  };

  // Generate room items to ensure 6 items are rendered
  const duplicatedRoomList = generateRoomItems(roomList);
  return (
    <>
      <div className='flex flex-row justify-between mb-2'>
        <div className='flex flex-row w-2/4 lg:w-2/5 ml-2 px-3 py-3 gap-4 lg:px-5 lg:gap-5 bg-ourGray/50 rounded-xl'>
          <MakeRoomBtn />
          <QuickStartGameBtn />
        </div>
        <div className='w-1/4 lg:w-1/5 lg:px-5 px-4 py-3 mr-2 bg-ourGray/50 rounded-xl'>
          <RefreshRoomsBtn />
        </div>
      </div>
      <div className='grid grid-cols-2 py-4 px-5 gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-6 lg:gap-x-6 lg:px-6 bg-ourGray/50 rounded-xl'>
        {duplicatedRoomList.map((info: RoomInfo | undefined, idx: number) => (
          <GameRoomItem key={idx} roomInfo={info} />
        ))}
      </div>
      <div className='flex flex-row py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-6 lg:px-20'>
        <PagingBtn />
        <PagingBtn />
      </div>
    </>
  );
}
