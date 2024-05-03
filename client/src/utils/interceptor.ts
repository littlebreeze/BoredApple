'use client';
import axios from 'axios';

// axios instance
const instance = axios.create({
  baseURL: process.env.LOCAL_PUBLIC_API_SERVER,
  headers: {
    // CORS 정책을 허용할 오리진 설정
    'Access-Control-Allow-Origin': 'https://j10a601.p.ssafy.io/8081',
    // CORS 요청에서 자격 증명 정보를 허용
    'Access-Control-Allow-Credentials': 'true',
    // CORS 요청에서 허용하는 HTTP 메소드
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  },
});

// refresh axios instance
const refreshInstance = axios.create({
  baseURL: process.env.LOCAL_PUBLIC_API_SERVER,
});

// request refresh token (in request body)
const regenerateRefreshToken = async () => {
  const headers = {
    'Content-Type': 'text/plain;charset=utf-8',
  };
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await refreshInstance.post('/login/oauth/token', refreshToken, { headers: headers });
  return response;
};

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // 요청 전달 전 미리 헤더에 엑세스 토큰 저장
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    // 요청 오류 시 작업 수행
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    // 2xx 상태 코드 시 이 함수 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async (error) => {
    // 2xx 이외 상태 코드 시 이 함수 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response.status == 401) {
      const originRequest = error.config;

      try {
        // 토큰 재발급
        const response = await regenerateRefreshToken();
        if (response.status == 200) {
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        }
      } catch (error) {
        // 토큰 재발급 실패 시 로그인 요청
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
