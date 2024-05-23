'use client';
import axios from 'axios';
import { useSSEStore } from '@/stores/sse';

// 1. Axios 기본 인스턴스
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// 2. Access token 재생성용 axios 인스턴스
const accessInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// 3. Refresh token 재생성용 axios 인스턴스
const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
});

// 4. 인스턴스의 요청 인터셉터: 요청 시마다 기본적으로 적용
instance.interceptors.request.use(
  (config) => {
    // 요청 전달 전 미리 헤더에 엑세스 토큰 저장
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    // 요청 오류 시 작업 수행
    return Promise.reject(error);
  }
);

// 5. 인스턴스의 응답 인터셉터: 응답 시마다 기본적으로 적용
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

    // 토큰이 존재하지 않을 경우
    // if (error.response.status == 400) {
    //   try {
    //     const response = await regenerateAccessToken();

    //     // 토큰 재발급 성공 시 토큰을 다시 세팅하고 헤더에 담음
    //     if (response.status == 200) {
    //       const newAccessToken = response.data.data.accessToken;
    //       instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    //       // 이벤트 수신 객체 토큰 변경
    //       useSSEStore.getState().setAccessToken(newAccessToken);

    //       return instance(originRequest);
    //     }
    //   } catch (error) {
    //     // 토큰 재발급 실패 시 로그인 요청 페이지로 이동
    //     window.location.replace('/login');
    //   }
    // }

    // 토큰이 만료되거나 유효하지 않은 경우
    if (error.response.status == 401) {
      try {
        const response = await regenerateTokens();

        // 토큰 재발급 성공 시 토큰을 다시 세팅하고 헤더에 담음
        if (response.status == 200) {
          const newAccessToken = response.data.data.accessToken;
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

          // 이벤트 수신 객체 토큰 변경
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

// access token 재생성 요청
// const regenerateAccessToken = async () => {
//   const headers = {
//     'Content-Type': 'text/plain;charset=utf-8',
//   };
//   const tokenString =
//     'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfVVNFUiJdLCJhdWQiOiJodHRwczovL2sxMGE1MDgucC5zc2FmeS5pby8iLCJzdWIiOiIxMTczMTE0MDcwMjUxNTcwMTYxMjUiLCJpc3MiOiJodHRwczovL2sxMGE1MDgucC5zc2FmeS5pby8iLCJpYXQiOjE3MTU5MjgyNDgsImV4cCI6MTcxNTkzMDA0OH0.XujnBIBcriOLzc6Nl2hB8VHUv7VAARxcHKnOMIp522xje9EYKXU6JKZEuGVCySP3xHJqrkl8YWEGDWCS2a3ZLg';
//   accessInstance.defaults.headers.common['Authorization'] = `Bearer ${tokenString}`;
//   const response = await accessInstance.post('/user-service/oauth/token', {}, { headers: headers });
//   return response;
// };

// refresh token 재생성 요청
const regenerateTokens = async () => {
  const headers = {
    'Content-Type': 'text/plain;charset=utf-8',
  };
  const response = await refreshInstance.post('/user-service/oauth/token', {}, { headers: headers });
  return response;
};

export default instance;
