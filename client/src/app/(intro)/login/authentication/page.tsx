import type { Metadata } from 'next';
import Authentication from './_components/Authentication';
import loading from '@/../public/login/loading.png';
import Image from 'next/image';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '로그인',
  description: '문해력 학습 서비스 심심한 사과의 로그인 페이지',
};

export default function Page() {
  return (
    <>
      <div className='mx-auto h-screen max-w-[800px] flex flex-col justify-center items-center'>
        <Image src={loading} className='w-5 h-5 mb-4 motion-safe:animate-spin' alt='로딩 중' />
        <div className='mb-4'>로그인 중</div>
        <Suspense fallback={<div>서버에 연결하는 중 입니다 . . .</div>}>
          <Authentication />
        </Suspense>
      </div>
      ;
    </>
  );
}
