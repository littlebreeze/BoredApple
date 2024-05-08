import GameRightSection from './_component/GameRightSection';

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row lg:flex-row md:justify-evenly lg:justify-center gap-5 md:gap-0 lg:gap-10'>
      <div className='w-1/2 md:w-1/4 lg:w-1/5 bg-ourGray/50 mx-auto md:mx-0'>
        <div className='relative'>랭킹</div>
      </div>
      <div className='w-full md:w-3/5 lg:w-3/5 '>
        <GameRightSection />
      </div>
    </div>
  );
}
