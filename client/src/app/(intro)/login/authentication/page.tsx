import type { Metadata } from 'next';
import Authentication from './_components/Authentication';
import loading from '@/../public/login/loading.png';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '로그인',
  description: '문해력 학습 서비스 심심한 사과의 로그인 페이지',
};

export default function Page() {
  return (
    <>
      <div className='mx-auto h-screen max-w-[800px] flex flex-col justify-center items-center'>
        <Image src={loading} className='motion-safe:animate-spin h-5 w-5 mb-4' alt='로딩 중' />
        <div>로그인 중</div>
        <div>
          <Authentication />
        </div>
      </div>
      ;
    </>
  );
}
