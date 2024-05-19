'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import instance from '@/utils/interceptor';
import { useSSEStore } from '@/stores/sse';

export default function Authentication() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code: string | null = searchParams.get('code');

  useEffect(() => {
    if (code) {
      postLogin(code);
    }
  }, [code]);

  const postLogin = async (code: string | null) => {
    const headers = {
      'Content-Type': 'text/plain;charset=utf-8',
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/user-service/oauth2/code/google`, code, {
        headers: headers,
        withCredentials: true,
      });

      // 메모리에 토큰 저장
      const accessToken = response.data.data.accessToken;
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 이벤트 객체 생성에 사용할 accessToken 저장
      //setEventSource(accessToken);
      useSSEStore.getState().setAccessToken(accessToken);

      // 기존 유저인지 신규 유저인지 판단하여 라우팅 처리
      handleRouter(response.data.data.signUpProcess);
    } catch (error) {
      // console.log('error: ', error);
    }
  };

  const handleRouter = (signUpProcess: number) => {
    if (signUpProcess == 1) {
      router.push('/signup/nickname');
    } else if (signUpProcess == 2) {
      router.push('/signup/interest');
    } else if (signUpProcess == 3) {
      router.push('/signup/learning-time');
    } else {
      router.push('/home');
    }
  };

  return <></>;
}
