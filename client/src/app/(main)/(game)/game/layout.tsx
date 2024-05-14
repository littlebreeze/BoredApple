import RQProvider from '@/queries/RQProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className='relative h-screen'>
      <Image
        className='absolute top-0 left-0 object-cover h-screen'
        src='/game-background.svg'
        loading='eager'
        priority
        fill
        alt='게임배경'
      />
      <div className='relative z-10'>
        <div className='px-5'>
          <div className='w-[300px] mx-auto pt-7 pb-3'>
            <Image
              className='w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] z-20 relative'
              src='/game-title-2.svg'
              loading='eager'
              width={500}
              height={500}
              alt='어휘퀴즈 타이틀'
            />
          </div>
          <RQProvider>
            {children}
            {modal}
          </RQProvider>
        </div>
      </div>
      <Link href={'/home'} className='absolute bottom-10 right-10 z-30 w-16 h-16 duration-150 hover:w-20 hover:h-20'>
        <Image
          className='w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)] z-20 relative'
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
