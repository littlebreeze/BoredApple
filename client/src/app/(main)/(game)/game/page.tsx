import GameRightSection from './_component/GameRightSection';

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row lg:flex-row  md:justify-evenly lg:justify-evenly gap-5 md:gap-0 lg:gap-0 '>
      <div className='w-1/2 md:w-1/4 lg:w-1/5 bg-red-300 mx-auto md:mx-0 lg:mx-0'>랭킹</div>
      <div className='w-full md:w-3/5 lg:w-3/5 '>
        <GameRightSection />
      </div>
    </div>
  );
}
