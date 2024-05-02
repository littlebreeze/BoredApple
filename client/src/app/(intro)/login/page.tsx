import type { Metadata } from 'next';
import Link from 'next/link';
import googleLogo from '@/../public/login/google-logo.svg';
import Image from 'next/image';
import GoogleLogin from './_components/GoogleLogin';

export const metadata: Metadata = {
  title: '로그인',
  description: '문해력 학습 서비스 심심한 사과의 로그인 페이지',
};

export default function Page() {
  return (
    <div className='mx-auto h-screen max-w-[800px] flex flex-col justify-center items-center'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='text-ourTheme text-xl'>당신의 문해력 지키미,</div>
        <div className='text-ourTheme font-Ansungtangmyun text-7xl'>심심한 사과</div>
      </div>
      {/* <div className='flex items-center justify-center w-96 font-semibold bg-white shadow-md cursor-pointer shadow-zinc-400 h-14 mt-14'>
        <Image className='ml-4 max-w-4' src={googleLogo} alt='구글 로고' />
        <button className='flex-1' onClick={() => signIn()}>
          Google 계정으로 로그인
        </button>
        <div className='ml-8' />
      </div> */}
      <GoogleLogin />
      <div className='w-96 text-xs text-zinc-300 mt-7'>
        심심한 사과는 Google API에서 받은 정보를 사용하고 다른 앱으로 전송하는 것은 제한된 사용 요구 사항을 포함하여{' '}
        <Link
          className='underline text-zinc-400'
          href='https://developers.google.com/terms/api-services-user-data-policy'
        >
          Google API Services User Data Policy
        </Link>
        을 준수합니다.
      </div>
    </div>
  );
}
