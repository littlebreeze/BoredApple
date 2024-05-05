'use client';
import { useState } from 'react';

import Calendar from 'react-calendar';
import './Calendar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; //한국어
import { useRecordStore } from '@/stores/record';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComponent() {
  const registerDate = '2024-05-03';
  const solvedCnt = [3, 2, 1, 0, 0, 1, 0, 0, 1, 0, 2, 0, 3, 0, 3, 1, 3, 2, 1, 2, 3, 3, 3, 3, 2, 0, 0, 1, 1, 1, 0];
  const { today, onChange } = useRecordStore();
  return (
    <>
      <Calendar
        onChange={onChange}
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
          const day: number = date.getDate() - 1;
          let classType: string = '';
          if (solvedCnt[day] === 1) {
            classType = 'one';
          } else if (solvedCnt[day] === 2) {
            classType = 'two';
          } else if (solvedCnt[day] === 3) {
            classType = 'three';
          }
          return `react-calendar__tile--${classType}-solved`;
        }}
      />
    </>
  );
}
