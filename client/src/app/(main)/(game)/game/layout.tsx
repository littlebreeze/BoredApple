import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang='ko' className='px-5 h-screen overflow-hidden'>
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
  );
}
