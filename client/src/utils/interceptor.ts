'use client';
import axios from 'axios';
import { useSSEStore } from '@/stores/sse';

// 1. Axios 기본 인스턴스
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// 2. token 재생성용 axios 인스턴스
const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// 3. 인스턴스의 요청 인터셉터
// 요청 시마다 기본적으로 적용
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. 인스턴스의 응답 인터셉터
// 응답 시마다 기본적으로 적용
instance.interceptors.response.use(
  // 200번대 상태 코드 시 실행
  // 응답 데이터가 있는 작업 수행
  (response) => {
    return response;
  },

  // 200번대 이외의 상태 코드 시 실행
  // 응답 오류가 있는 작업 수행
  async (error) => {
    const originRequest = error.config;

    // 토큰이 만료되거나 유효하지 않은 경우
    if (error.response.status == 401) {
      try {
        const response = await regenerateTokens();

        // 토큰 재발급 성공 시 토큰을 다시 세팅하고 헤더 및 스토어에 담음
        if (response.status == 200) {
          const newAccessToken = response.data.data.accessToken;
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          useSSEStore.getState().setAccessToken(newAccessToken);

          return instance(originRequest);
        }
      } catch (error) {
        // 토큰 재발급 실패 시 로그인 요청 페이지로 이동
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

// token 재생성 요청 함수
const regenerateTokens = async () => {
  const headers = {
    'Content-Type': 'text/plain;charset=utf-8',
  };
  const response = await refreshInstance.post('/user-service/oauth/token', {}, { headers: headers });
  return response;
};

export default instance;
