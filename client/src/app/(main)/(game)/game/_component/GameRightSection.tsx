'use client';
import { useEffect, useState } from 'react';
import MakeRoomBtn from './MakeRoomBtn';
import GameRoomItem from './GameRoomItem';
import PagingBtn from './PagingBtn';
import QuickStartGameBtn from './QuickStartGameBtn';
import RefreshRoomsBtn from './RefreshRoomsBtn';
import { useGameWaitStore } from '@/stores/game-wait';
import InsertPasswordModal from './InsertPasswordModal';
import { useGameRoomList } from '@/queries/game-wait';
import axios from 'axios';

type GameRoomInfo = {
  id: number;
  roomName: string;
  isSecret: boolean;
  roomPassword: string;
  nowNum: number;
  maxNum: number;
  isStarted: boolean;
  roomCreatorName: string;
  quizCount: number;
  isEndPage: boolean;
};

type GRResponse = {
  data: GameRoomInfo[];
};
const roomInfo: GameRoomInfo[] = [
  {
    id: 1,
    roomName: '외않되',
    isSecret: true,
    roomPassword: '1234',
    nowNum: 2,
    maxNum: 4,
    isStarted: false,
    roomCreatorName: '문해너구리',
    quizCount: 20,
    isEndPage: false,
  },
  {
    id: 2,
    roomName: '외않되',
    isSecret: false,
    roomPassword: '1234',
    nowNum: 2,
    maxNum: 4,
    isStarted: false,
    roomCreatorName: '문해너구리',
    quizCount: 20,
    isEndPage: false,
  },
  {
    id: 3,
    roomName: '외않되',
    isSecret: true,
    roomPassword: '1234',
    nowNum: 2,
    maxNum: 4,
    isStarted: false,
    roomCreatorName: '문해너구리',
    quizCount: 20,
    isEndPage: false,
  },
  {
    id: 4,
    roomName: '외않되',
    isSecret: false,
    roomPassword: '1234',
    nowNum: 2,
    maxNum: 4,
    isStarted: true,
    roomCreatorName: '문해너구리',
    quizCount: 20,
    isEndPage: false,
  },
  {
    id: 5,
    roomName: '외않되',
    isSecret: false,
    roomPassword: '1234',
    nowNum: 2,
    maxNum: 4,
    isStarted: false,
    roomCreatorName: '문해너구리',
    quizCount: 20,
    isEndPage: false,
  },
];

export default function GameRightSection() {
  const { pageNum, setPageNum } = useGameWaitStore();
  // const { data } = useGameRoomList(pageNum);
  const { isShow } = useGameWaitStore();
  const { roomList, setRoomList } = useGameWaitStore();

  const generateRoomItems = (list: GameRoomInfo[]): (GameRoomInfo | undefined)[] => {
    let duplicatedList: (GameRoomInfo | undefined)[] = [];
    for (let idx = 0; idx < 6; idx++) {
      if (idx < roomList.length) duplicatedList.push(list[idx]);
      else duplicatedList.push(undefined);
    }
    return duplicatedList;
  };

  // Generate room items to ensure 6 items are rendered
  const duplicatedRoomList = generateRoomItems(roomList);

  const getRoomList = async () => {
    const response = await axios.get<GRResponse>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/rooms/${pageNum}`);
    console.log(response.data.data);
  };

  useEffect(() => {
    //if (data?.data) setRoomList(data?.data.data);
    //getRoomList();
    setRoomList(roomInfo);
    //console.log(roomList);
  }, [pageNum]);

  return (
    <div className='relative'>
      {isShow && <InsertPasswordModal />}
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
        {duplicatedRoomList.map((info: GameRoomInfo | undefined, idx: number) => (
          <GameRoomItem key={idx} roomInfo={info} />
        ))}
      </div>
      <div className='flex flex-row py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-6 lg:px-20'>
        <PagingBtn title='이전' activate={pageNum !== 1} />
        <PagingBtn title='다음' activate={roomList[0].isEndPage} />
      </div>
    </div>
  );
}
