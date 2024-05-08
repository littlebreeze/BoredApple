'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function Authentication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get('code');
  const baseURL = `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/oauth2/code/google`;

  useEffect(() => {
    if (code) {
      postLogin(code);
    }
  }, [code]);

  const handleRouter = (props: string | number) => {
    if (props == 1) {
      router.push('/signup/nickname');
    } else if (props == 2) {
      router.push('/signup/interest');
    } else if (props == 3) {
      router.push('/signup/learning-time');
    } else {
      router.push('/');
    }
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

      // 기존 유저인지 신규 유저인지 판단하여 라우팅 처리
      handleRouter(response.data.data.signUpProcess);
    } catch (error) {
      // console.log('error: ', error);
    }
  };

  return <></>;
}
