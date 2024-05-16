import Image from 'next/image';
import RQProvider from '@/queries/RQProvider';
import SoundSection from './_component/SoundSection';

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
          <SoundSection />
        </div>
      </div>
    </div>
  );
}
