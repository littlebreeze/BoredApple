'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import instance from '@/utils/interceptor';

export default function LearningTime() {
  const router = useRouter();
  const [valid, setValid] = useState(true);

  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleHourClick(12);
  }, []);

  // 시간 목록 생성
  const hours = Array.from({ length: 24 }, (_, index) => index);

  // 분 목록 생성 (10분 단위)
  const minutes = Array.from({ length: 6 }, (_, index) => index * 10);

  // 시간 선택 시 스크롤 이동
  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    const hourElement = hourRef.current?.querySelector(`#hour-${hour}`);
    hourElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // 분 선택 시 스크롤 이동
  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    const minuteElement = minuteRef.current?.querySelector(`#minute-${minute}`);
    minuteElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // 빈 div박스 생성 함수
  const renderEmptyDivs = () => (
    <>
      <div className='py-4 h-[42px]'></div>
      <div className='py-4 h-[42px]'></div>
      <div className='py-4 h-[42px]'></div>
    </>
  );

  const handleNextClick = async () => {
    if (valid) {
      await instance.post(`/user-service/studytime`, {
        hour: selectedHour,
        minute: selectedMinute,
      });
      // 회원가입 처리한 뒤 완료되면 페이지 이동
      Swal.fire({
        title: '가입을 환영합니다.',
        text: '심심한 사과와 함께 문해력을 키워보세요!',
        confirmButtonColor: '#0064FF',
      });
      router.push('/home');
    }
  };

  return (
    <>
      <div className='relative flex w-80 h-80  justify-between'>
        {/* 시간 선택 */}
        <div
          className='absolute top-[130px] w-80 h-[60px] flex justify-center items-center text-5xl'
          style={{ pointerEvents: 'none' }}
        >
          :
        </div>
        <div ref={hourRef} className='w-5/12 h-80 overflow-y-auto bg-white scrollbar-hide rounded-3xl'>
          {renderEmptyDivs()}
          {hours.map((hour) => (
            <div
              key={hour}
              id={`hour-${hour}`}
              className={
                selectedHour === hour
                  ? 'bg-ourBlue text-white font-bold py-4 text-center cursor-pointer text-2xl'
                  : 'text-black py-4 text-center cursor-pointer text-lg'
              }
              onClick={() => handleHourClick(hour)}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
          {renderEmptyDivs()}
        </div>

        {/* 분 선택 */}
        <div ref={minuteRef} className='w-5/12 h-80 overflow-y-auto bg-white scrollbar-hide rounded-3xl'>
          {renderEmptyDivs()}
          {minutes.map((minute) => (
            <div
              key={minute}
              id={`minute-${minute}`}
              className={
                selectedMinute === minute
                  ? 'bg-ourBlue text-white font-bold py-4 text-center cursor-pointer text-2xl'
                  : 'text-black py-4 text-center cursor-pointer text-lg'
              }
              onClick={() => handleMinuteClick(minute)}
            >
              {minute.toString().padStart(2, '0')}
            </div>
          ))}
          {renderEmptyDivs()}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div></div>
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          valid ? 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={handleNextClick}
        disabled={!valid}
      >
        다음
      </button>
    </>
  );
}
