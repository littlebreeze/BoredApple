'use client';
import axios from 'axios';

// 1. Axios 기본 인스턴스
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'https://k10a601.p.ssafy.io:8081', // CORS 정책을 허용할 오리진 설정
    'Access-Control-Allow-Credentials': 'true', // CORS 요청에서 자격 증명 정보를 허용
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // CORS 요청에서 허용하는 HTTP 메소드
  },
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
    // 토큰이 존재하지 않는 경우
    if (error.response.status == 400) {
      console.log('400번 에러 발생');
      const originRequest = error.config;

      try {
        const response = await regenerateAccessToken();

        // 토큰 재발급 성공 시 토큰을 다시 세팅하고 헤더에 담음
        if (response.status == 200) {
          const newAccessToken = response.data.data.accessToken;
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originRequest);
        }
      } catch (error) {
        // 토큰 재발급 실패 시 로그인 요청 페이지로 이동
        window.location.replace('/login');
      }
    }

    // 토큰이 만료되거나 유효하지 않은 경우
    if (error.response.status == 401) {
      console.log('401번 에러 발생');
      const originRequest = error.config;

      try {
        const response = await regenerateRefreshToken();

        // 토큰 재발급 성공 시 토큰을 다시 세팅하고 헤더에 담음
        if (response.status == 200) {
          const newAccessToken = response.data.data.accessToken;
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
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
const regenerateAccessToken = async () => {
  const headers = {
    'Content-Type': 'text/plain;charset=utf-8',
  };
  accessInstance.defaults.headers.common['Authorization'] = `Bearer boredApple`;
  const response = await accessInstance.post('/user-service/oauth/token', {}, { headers: headers });
  return response;
};

// refresh token 재생성 요청
const regenerateRefreshToken = async () => {
  const headers = {
    'Content-Type': 'text/plain;charset=utf-8',
  };
  const response = await refreshInstance.post('/user-service/oauth/token', {}, { headers: headers });
  return response;
};

export default instance;
