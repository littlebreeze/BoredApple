import instance from '@/utils/interceptor';
import axios from 'axios';

// example
// const handleLike = async () => {
//   try {
//     const response = await instance.patch(`festivals/${festivalInfoData.id}`);
//     if (response.data.status === 'success') {
//       setLikedFestival((prevLiked) => !prevLiked);
//     }
//   } catch (error) {
//     //error
//   }
// };

// export const onLogInSuccess = (response: AxiosResponse) => {
//   // AccessToken을 변수로 저장
//   const { accessToken } = response.data;
//   // 헤더에 토큰 저장
//   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//   // AccessToken 만료 30초전에 RefreshToken으로
//   // AccessToken을 받아오는 함수를 실행하는 코드
// };
