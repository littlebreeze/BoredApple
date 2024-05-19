'use client';
import googleLogo from '@/../public/login/google-logo.svg';
import Image from 'next/image';

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <>
      <div
        className='flex items-center justify-center font-semibold bg-white shadow-md cursor-pointer w-96 shadow-zinc-400 h-14 mt-14'
        onClick={handleGoogleLogin}
      >
        <Image className='ml-4 max-w-4' src={googleLogo} alt='구글 로고' />
        <button className='flex-1'>Google 계정으로 로그인</button>
        <div className='ml-8' />
      </div>
    </>
  );
}
