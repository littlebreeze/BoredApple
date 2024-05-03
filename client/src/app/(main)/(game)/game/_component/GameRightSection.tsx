import GameMenuBtn from './GameMenuBtn';
import GameRoomItem from './GameRoomItem';
import PagingBtn from './PagingBtn';

type RoomInfo = {
  roomId: number;
  title: string;
  manager: string;
  current: number;
  limit: number;
  isLocked: boolean;
  quiz: number;
};

const roomInfo: RoomInfo = {
  roomId: 1,
  title: '문제! 풀자!',
  manager: '문해너구리',
  current: 2,
  limit: 6,
  isLocked: true,
  quiz: 20,
};

export default function GameRightSection() {
  return (
    <>
      <div className='flex flex-row justify-between mb-3'>
        <div className='flex flex-row w-2/4 ml-2 lg:px-7 px-3 py-4 gap-4 lg:gap-7 bg-ourGray/50 rounded-xl'>
          <GameMenuBtn />
          <GameMenuBtn />
        </div>
        <div className='w-1/4 lg:px-7 px-4 py-4 mr-2 bg-ourGray/50 rounded-xl'>
          <GameMenuBtn />
        </div>
      </div>
      <div className='grid grid-cols-2 py-5 px-5 lg:px-10 gap-x-2 gap-y-3 md:gap-x-5 md:gap-y-6 lg:gap-x-10 bg-ourGray/50 rounded-xl'>
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
      </div>
      <div className='flex flex-row py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-8 lg:px-20'>
        <PagingBtn />
        <PagingBtn />
      </div>
    </>
  );
}
