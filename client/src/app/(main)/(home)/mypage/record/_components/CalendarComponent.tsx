'use client';
import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; //한국어
import { useRecordStore } from '@/stores/record';
import instance from '@/utils/interceptor';

const getCalendarData = async (yearMonth: Date | null) => {
  const response = await instance.post<{ data: number[] }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/user-service/calendar`,
    {
      date: yearMonth,
      year: yearMonth?.getFullYear(),
      month: yearMonth!.getMonth() + 1,
    }
  );
  return response;
};

export default function CalendarComponent() {
  const { solvedCnt, setSolvedCnt } = useRecordStore();
  const { today, onChange } = useRecordStore();

  const { yearMonth, onChangeYearMonth } = useRecordStore();

  useEffect(() => {
    console.log('월 바뀜 캘린더 요청 보내라');
    getCalendarData(yearMonth).then((value) => setSolvedCnt(value.data.data));
  }, [yearMonth]);

  return (
    <>
      <Calendar
        onChange={onChange}
        onActiveStartDateChange={({ action, activeStartDate, value, view }) => {
          if (view === 'month') onChangeYearMonth(activeStartDate);
        }}
        value={today}
        locale='ko'
        calendarType='gregory'
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => dayjs(date).format('D')}
        showNeighboringMonth={false}
        // minDate={new Date(registerDate)}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date()}
        tileClassName={({ date, view }) => {
          const dayNum: number = date.getDate() - 1;
          let classType: string = '';
          if (view === 'month') {
            if (solvedCnt[dayNum] === 1) {
              classType = 'one';
            } else if (solvedCnt[dayNum] === 2) {
              classType = 'two';
            } else if (solvedCnt[dayNum] === 3) {
              classType = 'three';
            }
            return `react-calendar__tile--${classType}-solved`;
          }
        }}
      />
    </>
  );
}
