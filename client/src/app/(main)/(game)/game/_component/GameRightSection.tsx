import GameMenuBtn from './GameMenuBtn';
import GameRoomItem from './GameRoomItem';
import PagingBtn from './PagingBtn';

export default function GameRightSection() {
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row w-2/4 bg-blue-300 lg:px-10 px-4 py-4 gap-4'>
          <GameMenuBtn />
          <GameMenuBtn />
        </div>
        <div className='w-1/4 bg-blue-300 lg:px-10 px-4 py-4 '>
          <GameMenuBtn />
        </div>
      </div>
      <div className='grid grid-cols-2 py-5 px-5 lg:px-10 gap-x-2 gap-y-3 md:gap-x-5 md:gap-y-6 lg:gap-x-10 bg-ourGray/50 rounded-xl'>
        <GameRoomItem />
        <GameRoomItem />
        <GameRoomItem />
        <GameRoomItem />
        <GameRoomItem />
        <GameRoomItem />
      </div>
      <div className='flex flex-row bg-red-200 py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-8 lg:px-20'>
        <PagingBtn />
        <PagingBtn />
      </div>
    </>
  );
}
