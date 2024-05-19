'use client';
import { useEffect } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; //한국어

import instance from '@/utils/interceptor';
import { useRecordStore } from '@/stores/record';

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
  const { solvedCnt, setSolvedCnt, registerDate } = useRecordStore();
  const { today, onChange } = useRecordStore();
  const { yearMonth, onChangeYearMonth, parseValueIntoDate } = useRecordStore();

  useEffect(() => {
    getCalendarData(yearMonth).then((value) => setSolvedCnt(value.data.data));
  }, [yearMonth?.getMonth()]);

  useEffect(() => {
    const date = parseValueIntoDate(today);
    onChangeYearMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, [today]);

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
            } else if (solvedCnt[dayNum] >= 3) {
              classType = 'three';
            }
            return `react-calendar__tile--${classType}-solved`;
          }
        }}
      />
    </>
  );
}
