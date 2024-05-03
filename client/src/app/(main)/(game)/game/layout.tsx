import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=''>
        <Image
          className='absolute object-cover h-screen top-0 left-0 opacity-50'
          src='/game-background.svg'
          loading='eager'
          layout='fill'
          alt='게임배경'
        />
        <div className='relative z-10'>
          <div className='px-5'>
            <div className='w-[300px] mx-auto pt-7 pb-3'>
              <Image
                className='w-full'
                src='/game-title-2.svg'
                loading='eager'
                width={500}
                height={500}
                alt='어휘퀴즈 타이틀'
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
