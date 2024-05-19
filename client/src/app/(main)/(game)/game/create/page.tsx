import CreateRoomModal from '../_component/CreateRoomModal';
import GameLeftSection from '../_component/GameLeftSection';
import GameRightSection from '../_component/GameRightSection';

export default function CreateRoom() {
  return (
    <div className='flex flex-col h-full gap-5 md:flex-row lg:flex-row md:justify-evenly lg:justify-center md:gap-0 lg:gap-10'>
      <div className='w-1/2 mx-auto md:w-1/4 lg:w-1/5 bg-ourGray/50 md:mx-0 lg:mx-0'>
        <GameLeftSection />
      </div>
      <div className='w-full md:w-3/5 lg:w-3/5'>
        <GameRightSection />
      </div>
    </div>
  );
}
