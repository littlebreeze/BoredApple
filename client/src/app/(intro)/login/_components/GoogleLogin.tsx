'use client';
import googleLogo from '@/../public/login/google-logo.svg';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function GoogleLogin() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <button onClick={() => signOut()}>으악</button>
      </div>
    );
  }
  return (
    <div className='flex items-center justify-center w-96 font-semibold bg-white shadow-md cursor-pointer shadow-zinc-400 h-14 mt-14'>
      <Image className='ml-4 max-w-4' src={googleLogo} alt='구글 로고' />
      <button className='flex-1' onClick={() => signIn('google', { redirectTo: '/home' })}>
        Google 계정으로 로그인
      </button>
      <div className='ml-8' />
    </div>
  );
}
