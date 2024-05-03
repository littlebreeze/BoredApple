'use client';
import googleLogo from '@/../public/login/google-logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function GoogleLogin() {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${process.env.GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile https://www.googleapis.com/auth/youtube`;
  };

  return (
    <>
      <div className='flex items-center justify-center w-96 font-semibold bg-white shadow-md cursor-pointer shadow-zinc-400 h-14 mt-14'>
        <Image className='ml-4 max-w-4' src={googleLogo} alt='구글 로고' />
        <button className='flex-1'>Google 계정으로 로그인</button>
        <div className='ml-8' />
      </div>
    </>
  );
}
