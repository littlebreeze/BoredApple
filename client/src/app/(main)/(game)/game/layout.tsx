import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Image
        className='absolute object-cover w-full top-0 left-0 z-10 opacity-50'
        src='game-background.svg'
        loading='eager'
        fill
        alt='게임배경'
      /> */}
      <div className='px-5 '>
        <div className='w-[300px] mx-auto mt-7 mb-3'>
          <Image
            className='w-full'
            src='game-title-2.svg'
            loading='eager'
            width={500}
            height={500}
            alt='어휘퀴즈 타이틀'
          />
        </div>
        {children}
      </div>
    </>
  );
}
