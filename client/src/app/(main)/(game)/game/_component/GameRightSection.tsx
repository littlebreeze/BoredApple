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
      <div className='flex flex-row justify-between mb-2'>
        <div className='flex flex-row w-2/4 lg:w-2/5 ml-2 px-3 py-3 gap-4 lg:px-5 lg:gap-5 bg-ourGray/50 rounded-xl'>
          <GameMenuBtn />
          <GameMenuBtn />
        </div>
        <div className='w-1/4 lg:w-1/5 lg:px-5 px-4 py-3 mr-2 bg-ourGray/50 rounded-xl'>
          <GameMenuBtn />
        </div>
      </div>
      <div className='grid grid-cols-2 py-4 px-5 gap-x-2 gap-y-2 md:gap-x-5 md:gap-y-6 lg:gap-x-6 lg:px-6 bg-ourGray/50 rounded-xl'>
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
        <GameRoomItem roomInfo={roomInfo} />
      </div>
      <div className='flex flex-row py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-6 lg:px-20'>
        <PagingBtn />
        <PagingBtn />
      </div>
    </>
  );
}
