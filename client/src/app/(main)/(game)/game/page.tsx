import Link from 'next/link';
import Image from 'next/image';

import GameLeftSection from './_component/GameLeftSection';
import GameRightSection from './_component/GameRightSection';

export default function Page() {
  return (
    <div className='flex flex-col h-full gap-5 md:flex-row lg:flex-row md:justify-evenly lg:justify-center md:gap-0 lg:gap-10 relative'>
      <div className='w-1/2 mx-auto md:w-1/4 lg:w-1/5 bg-ourGray/50 md:mx-0 lg:mx-0 rounded-2xl'>
        <GameLeftSection />
      </div>
      <div className='w-full md:w-3/5 lg:w-3/5'>
        <GameRightSection />
      </div>
      <Link
        href={'/home'}
        className='absolute bottom-3 right-7 w-16 h-16 duration-150 hover:w-20 hover:h-20'
      >
        <Image
          className='w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]'
          src='/game/icon-image.svg'
          loading='eager'
          fill
          alt='학습페이지로'
          title='학습페이지로'
        />
      </Link>
    </div>
  );
}
