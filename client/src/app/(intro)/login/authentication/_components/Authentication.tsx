'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function Authentication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get('code');
  const baseURL = `${process.env.NEXT_PUBLIC_PUBLIC_API_SERVER}/login/oauth2/code/google`;

  useEffect(() => {
    if (code) {
      postLogin(code);
    }
  }, [code]);

  const handleHome = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/signup/nickname');
  };

  const postLogin = async (code: string | null) => {
    const headers = {
      'Content-Type': 'text/plain;charset=utf-8',
    };

    try {
      const response = await axios.post(baseURL, code, {
        headers: headers,
      });

      // 토큰 저장
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);

      // 기존 유저인지 신규 유저인지 판단
      response.data.data.signUp ? handleProfile() : handleHome();
    } catch (error) {
      // console.log('error: ', error);
    }
  };

  return <></>;
}
