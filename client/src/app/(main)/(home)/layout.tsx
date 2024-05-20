import type { Metadata } from 'next';

import RQProvider from '@/queries/RQProvider';

import NavMenu from '../_components/NavMenu';

export const metadata: Metadata = {
  title: '심심한 사과, 당신의 문해력 지킴이',
  description: '문해력 학습 서비스 심심한 사과',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-ourLightGray h-screen flex flex-col items-center'>
      <NavMenu />
      <div className='w-full max-w-[1000px] flex-1 overflow-y-scroll scrollbar-hide'>
        <RQProvider>
          <div className='h-full'>{children}</div>
        </RQProvider>
      </div>
    </div>
  );
}
