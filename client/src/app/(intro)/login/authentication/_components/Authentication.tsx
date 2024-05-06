'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function Authentication() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get('code'); // 잘 찍힘

  //// 여기부터 수정 필요
  const baseURL = `${process.env.VITE_PUBLIC_API_SERVER}/login/oauth2/code/google`;

  //   useEffect(() => {
  //     if (code) {
  //       postLogin(code);
  //     }
  //   }, [code, nav]);

  const handleHome = () => {
    router.push('/');
    window.location.reload();
  };

  const handleProfile = () => {
    router.push('/regist');
    window.location.reload();
  };

  //   const postLogin = async (code) => {
  //     const headers = {
  //       'Content-Type': 'text/plain;charset=utf-8',
  //     };

  //     try {
  //       const response = await axios.post(baseURL, code, {
  //         headers: headers,
  //       });

  //       // 토큰 저장
  //       localStorage.setItem('accessToken', response.data.data.accessToken);
  //       localStorage.setItem('refreshToken', response.data.data.refreshToken);

  //       // isSigUp으로 기존/신규 여부 판단
  //       response.data.data.signUp ? handleProfile(response.data.data) : handleHome();
  //     } catch (error) {
  //       //error
  //     }
  //   };

  return <></>;
}
