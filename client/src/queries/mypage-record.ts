import { ARequest, AResponse, GResponse, RLRequest, RLResponse, SRResponse } from '@/types/MypageRecord';
import { useQuery, useMutation } from '@tanstack/react-query';
import instance from '@/utils/interceptor';

// 달력 요청
const postCalendarRecord = async (yearMonth: ARequest) => {
  const response = await instance.post<{ data: number[] }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/calendar`,
    yearMonth
  );

  return response;
};

export const useCalendarRecord = () => {
  return useMutation({ mutationKey: ['postCalendarRecord'], mutationFn: postCalendarRecord });
};

// 일자별 기록 요청
const postRecordList = async (yearMonthDay: RLRequest) => {
  const response = await instance.post<{ data: RLResponse }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/daystudy`,
    yearMonthDay
  );

  return response;
};

export const useRecordList = () => {
  return useMutation({ mutationKey: ['postRecordList'], mutationFn: postRecordList });
};

// 월별 출석 요청
const postAttendanceRecord = async (yearMonth: ARequest) => {
  const response = await instance.post<{ data: AResponse }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/attendance`,
    yearMonth
  );

  return response;
};

export const useAttendanceRecord = () => {
  return useMutation({ mutationKey: ['postAttendanceRecord'], mutationFn: postAttendanceRecord });
};

// 월별 학습 요청
const postStudyRecord = async (yearMonth: ARequest) => {
  const response = await instance.post<{ data: SRResponse }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/monthstudy`,
    yearMonth
  );

  return response;
};

export const useStudyRecord = () => {
  return useMutation({ mutationKey: ['postStudyRecord'], mutationFn: postStudyRecord });
};

// 게임 요청
// async - await 함수 작성
const getGameRecord = async () => {
  const response = await instance.get<{ data: GResponse }>(`${process.env.NEXT_PUBLIC_API_SERVER}/user-service/record`);
  return response;
};

// useQuery 리턴하는 Hook
export const useGameRecord = () => {
  return useQuery({ queryKey: ['getGameRecord'], queryFn: getGameRecord });
};
