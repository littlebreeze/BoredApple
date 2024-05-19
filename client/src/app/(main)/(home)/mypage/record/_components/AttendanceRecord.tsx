'use client';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; //한국어

import instance from '@/utils/interceptor';
import { AResponse } from '@/types/MypageRecord';
import { useRecordStore } from '@/stores/record';

import RecordDetailItem from './RecordDetailItem';

const getAttendanceData = async (yearMonth: Date | null) => {
  const response = await instance.post<{ data: AResponse }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/attendance`,
    {
      date: yearMonth,
      year: yearMonth?.getFullYear(),
      month: yearMonth!.getMonth() + 1,
    }
  );
  return response;
};
export default function AttendanceRecord() {
  // 월 바뀔 때 요청 보내기
  const { yearMonth, setRegisterDate } = useRecordStore();
  const [attendance, setAttendance] = useState<AResponse>();

  useEffect(() => {
    getAttendanceData(yearMonth).then((value) => {
      setAttendance(value.data.data);
    });
  }, [yearMonth?.getMonth()]);

  useEffect(() => {
    if (attendance) setRegisterDate(attendance?.registerDate);
  }, [attendance]);

  return (
    <div className='flex flex-col'>
      <div className='flex mb-2'>
        <svg
          className='mr-2'
          width='35'
          height='25'
          viewBox='0 0 458 400'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M91.4286 133.333H160C166.476 133.333 171.909 131.2 176.297 126.933C180.67 122.681 182.857 117.407 182.857 111.111C182.857 104.815 180.67 99.5333 176.297 95.2667C171.909 91.0148 166.476 88.8889 160 88.8889H91.4286C84.9524 88.8889 79.52 91.0148 75.1314 95.2667C70.7581 99.5333 68.5714 104.815 68.5714 111.111C68.5714 117.407 70.7581 122.681 75.1314 126.933C79.52 131.2 84.9524 133.333 91.4286 133.333ZM91.4286 222.222H160C166.476 222.222 171.909 220.089 176.297 215.822C180.67 211.57 182.857 206.296 182.857 200C182.857 193.704 180.67 188.422 176.297 184.156C171.909 179.904 166.476 177.778 160 177.778H91.4286C84.9524 177.778 79.52 179.904 75.1314 184.156C70.7581 188.422 68.5714 193.704 68.5714 200C68.5714 206.296 70.7581 211.57 75.1314 215.822C79.52 220.089 84.9524 222.222 91.4286 222.222ZM91.4286 311.111H160C166.476 311.111 171.909 308.978 176.297 304.711C180.67 300.459 182.857 295.185 182.857 288.889C182.857 282.593 180.67 277.311 176.297 273.044C171.909 268.793 166.476 266.667 160 266.667H91.4286C84.9524 266.667 79.52 268.793 75.1314 273.044C70.7581 277.311 68.5714 282.593 68.5714 288.889C68.5714 295.185 70.7581 300.459 75.1314 304.711C79.52 308.978 84.9524 311.111 91.4286 311.111ZM286.857 257.222C289.905 257.222 292.762 256.756 295.429 255.822C298.095 254.904 300.571 253.333 302.857 251.111L384 172.222C388.952 167.407 391.337 162.126 391.154 156.378C390.956 150.644 388.571 145.556 384 141.111C379.429 136.667 373.996 134.444 367.703 134.444C361.425 134.444 356 136.667 351.429 141.111L286.857 203.889L270.286 187.778C265.714 183.333 260.381 181.2 254.286 181.378C248.19 181.57 242.857 183.889 238.286 188.333C234.095 192.778 231.901 197.963 231.703 203.889C231.52 209.815 233.714 215 238.286 219.444L270.857 251.111C273.143 253.333 275.619 254.904 278.286 255.822C280.952 256.756 283.81 257.222 286.857 257.222ZM45.7143 400C33.1429 400 22.3848 395.652 13.44 386.956C4.48 378.244 0 367.778 0 355.556V44.4444C0 32.2222 4.48 21.7556 13.44 13.0444C22.3848 4.34815 33.1429 0 45.7143 0H411.429C424 0 434.766 4.34815 443.726 13.0444C452.671 21.7556 457.143 32.2222 457.143 44.4444V355.556C457.143 367.778 452.671 378.244 443.726 386.956C434.766 395.652 424 400 411.429 400H45.7143Z'
            fill='#0064FF'
          />
        </svg>
        <div className='text-ourTheme font-bold text-lg'>{yearMonth!.getMonth() + 1}월 출석</div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <RecordDetailItem title={'출석일수'} content={attendance ? attendance?.days + '일' : '-'} />
        <RecordDetailItem title={'출석율'} content={attendance ? attendance?.ratio + '%' : '-'} />
        <RecordDetailItem
          title={'심심한 사과와 처음 만난 날'}
          content={attendance ? dayjs(attendance!.registerDate.toString()).format('YY년 M월 D일') : '-'}
        />
      </div>
    </div>
  );
}
