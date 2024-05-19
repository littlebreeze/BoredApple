'use client';

import { useEffect, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useSSEStore } from '@/stores/sse';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  const [hasNewAlarm, setHasNewAlarm] = useState<boolean>(false);
  const [notiMessage, setNotiMessage] = useState<string>('오늘의 학습을 시작해 보세요!');

  const { eventSource, setEventSource, accessToken } = useSSEStore();

  // const newEventSource = EventSourcePolyfill;
  useEffect(() => {
    if (accessToken) {
      const newEventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_API_SERVER}/study-service/notifications`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Connection: 'keep-alive',
          },
          withCredentials: true,
          heartbeatTimeout: 86400000,
        }
      );
      //sse 최초 연결되었을 때
      newEventSource.onopen = (event) => {
        // console.log('SSE 연결# ', event);
      };

      //서버에서 뭔가 날릴 때마다
      newEventSource.onmessage = (event) => {
        // console.log('SSE 메세지# ', event.data);
        setHasNewAlarm(true);
      };

      newEventSource.addEventListener('notification', (event) => {
        // const { data } = event;
        setHasNewAlarm(true);
        // console.log(event);
        if ('data' in event) {
          setNotiMessage(String(event.data));
        }
      });

      //sse 에러
      newEventSource.onerror = (event) => {
        // console.log('SSE 오류# ', event);
        newEventSource.close();
      };

      setEventSource(newEventSource);
    } else {
      // console.log('아직 eventSource없음');
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [accessToken]);

  return (
    <>
      <div className='flex w-full max-w-[1000px] h-[60px] items-center justify-between'>
        <Link href='/home' className='flex justify-start w-36 items-center cursor-pointer'>
          <div className='font-Ansungtangmyun w-40 text-3xl text-ourTheme'>심심한 사과</div>
        </Link>
        <div className='flex justify-end gap-8 h-full'>
          {segment == 'home' ? (
            <>
              <Link
                href='/home'
                className='flex items-center gap-2  cursor-pointe h-full border-b-2 border-solid border-ourBlue'
              >
                <div className='flex justify-center items-center h-6 w-6'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_335_6)'>
                      <path
                        d='M13.2281 2.68799C12.877 2.41488 12.4449 2.2666 12.0001 2.2666C11.5553 2.2666 11.1232 2.41488 10.7721 2.68799L2.3881 9.20799C1.6361 9.79499 2.0501 11 3.0031 11H4.0001V19C4.0001 19.5304 4.21082 20.0391 4.58589 20.4142C4.96096 20.7893 5.46967 21 6.0001 21H10.0001V15C10.0001 14.4696 10.2108 13.9608 10.5859 13.5858C10.961 13.2107 11.4697 13 12.0001 13C12.5305 13 13.0392 13.2107 13.4143 13.5858C13.7894 13.9608 14.0001 14.4696 14.0001 15V21H18.0001C18.5305 21 19.0392 20.7893 19.4143 20.4142C19.7894 20.0391 20.0001 19.5304 20.0001 19V11H20.9971C21.9491 11 22.3651 9.79499 21.6121 9.20899L13.2281 2.68799Z'
                        fill='#0064FF'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_335_6'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='text-ourBlue'>나의 학습</div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/home'
                className='flex items-center gap-2  cursor-pointe h-full border-b-2 border-solid border-ourLightGray'
              >
                <div className='flex justify-center items-center h-6 w-6'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_335_2)'>
                      <path
                        d='M13.2281 2.68799C12.877 2.41488 12.4449 2.2666 12.0001 2.2666C11.5553 2.2666 11.1232 2.41488 10.7721 2.68799L2.3881 9.20799C1.6361 9.79499 2.0501 11 3.0031 11H4.0001V19C4.0001 19.5304 4.21082 20.0391 4.58589 20.4142C4.96096 20.7893 5.46967 21 6.0001 21H10.0001V15C10.0001 14.4696 10.2108 13.9608 10.5859 13.5858C10.961 13.2107 11.4697 13 12.0001 13C12.5305 13 13.0392 13.2107 13.4143 13.5858C13.7894 13.9608 14.0001 14.4696 14.0001 15V21H18.0001C18.5305 21 19.0392 20.7893 19.4143 20.4142C19.7894 20.0391 20.0001 19.5304 20.0001 19V11H20.9971C21.9491 11 22.3651 9.79499 21.6121 9.20899L13.2281 2.68799Z'
                        fill='#737373'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_335_2'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='text-ourDarkGray'>나의 학습</div>
              </Link>
            </>
          )}

          {segment == 'mypage' ? (
            <>
              <Link
                href='/mypage/analysis'
                className='flex items-center gap-2  cursor-pointer h-full border-b-2 border-solid border-ourBlue'
              >
                <div className='flex justify-center items-center h-6 w-6'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_164_6)'>
                      <path
                        d='M8 8.7998C8 7.73894 8.42143 6.72152 9.17157 5.97138C9.92172 5.22123 10.9391 4.7998 12 4.7998C13.0609 4.7998 14.0783 5.22123 14.8284 5.97138C15.5786 6.72152 16 7.73894 16 8.7998C16 9.86067 15.5786 10.8781 14.8284 11.6282C14.0783 12.3784 13.0609 12.7998 12 12.7998C10.9391 12.7998 9.92172 12.3784 9.17157 11.6282C8.42143 10.8781 8 9.86067 8 8.7998Z'
                        fill='#0064FF'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM1.6 12C1.60003 10.2795 2.02691 8.58584 2.84239 7.07085C3.65786 5.55586 4.83647 4.26686 6.27258 3.31934C7.70869 2.37183 9.35744 1.79541 11.0711 1.64173C12.7847 1.48805 14.5097 1.76193 16.0915 2.4388C17.6733 3.11568 19.0624 4.17442 20.1345 5.52014C21.2065 6.86586 21.9279 8.45652 22.234 10.1496C22.5402 11.8427 22.4215 13.5852 21.8886 15.2212C21.3558 16.8571 20.4254 18.3352 19.1808 19.5232C19.0614 18.1254 18.4216 16.8234 17.3882 15.8747C16.3547 14.926 15.0029 14.3997 13.6 14.4H10.4C8.99713 14.3997 7.64525 14.926 6.61181 15.8747C5.57837 16.8234 4.93864 18.1254 4.8192 19.5232C3.80043 18.5531 2.98967 17.3859 2.43625 16.0925C1.88283 14.7992 1.59831 13.4068 1.6 12Z'
                        fill='#0064FF'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_164_6'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='text-ourBlue'>활동 기록</div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/mypage/analysis'
                className='flex items-center gap-2  cursor-pointer h-full border-b-2 border-solid border-ourLightGray'
              >
                <div className='flex justify-center items-center h-6 w-6'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_129_233)'>
                      <path
                        d='M8 8.7998C8 7.73894 8.42143 6.72152 9.17157 5.97138C9.92172 5.22123 10.9391 4.7998 12 4.7998C13.0609 4.7998 14.0783 5.22123 14.8284 5.97138C15.5786 6.72152 16 7.73894 16 8.7998C16 9.86067 15.5786 10.8781 14.8284 11.6282C14.0783 12.3784 13.0609 12.7998 12 12.7998C10.9391 12.7998 9.92172 12.3784 9.17157 11.6282C8.42143 10.8781 8 9.86067 8 8.7998Z'
                        fill='#737373'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM1.6 12C1.60003 10.2795 2.02691 8.58584 2.84239 7.07085C3.65786 5.55586 4.83647 4.26686 6.27258 3.31934C7.70869 2.37183 9.35744 1.79541 11.0711 1.64173C12.7847 1.48805 14.5097 1.76193 16.0915 2.4388C17.6733 3.11568 19.0624 4.17442 20.1345 5.52014C21.2065 6.86586 21.9279 8.45652 22.234 10.1496C22.5402 11.8427 22.4215 13.5852 21.8886 15.2212C21.3558 16.8571 20.4254 18.3352 19.1808 19.5232C19.0614 18.1254 18.4216 16.8234 17.3882 15.8747C16.3547 14.926 15.0029 14.3997 13.6 14.4H10.4C8.99713 14.3997 7.64525 14.926 6.61181 15.8747C5.57837 16.8234 4.93864 18.1254 4.8192 19.5232C3.80043 18.5531 2.98967 17.3859 2.43625 16.0925C1.88283 14.7992 1.59831 13.4068 1.6 12Z'
                        fill='#737373'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_129_233'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='text-ourDarkGray'>활동 기록</div>
              </Link>
            </>
          )}
          <div
            title={`${hasNewAlarm ? '학습 시간!' : '(학습 시간 알림)'}`}
            className={`flex items-center h-full border-ourLightGray mr-3 ${
              hasNewAlarm ? 'cursor-pointer ' : 'cursor-help '
            }`}
            onClick={() => {
              if (hasNewAlarm) {
                Swal.fire({
                  title: '학습 알림',
                  text: `${notiMessage}`,
                  confirmButtonColor: '#0064FF',
                });
                setHasNewAlarm(false);
              }
            }}
          >
            {hasNewAlarm ? (
              <svg width='27' height='27' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M236.596 37.5645L234.68 37.5059H234.375C225.744 37.5059 217.647 40.9687 210.633 46.2949C203.619 51.6211 201.563 56.25 201.563 56.25L253.125 106.641C253.125 106.641 259.717 103.295 263.443 98.5254C267.17 93.7559 271.811 87.9316 271.834 76.7812C271.875 55.9863 256.406 38.7598 236.596 37.5645ZM63.4044 37.5645L65.3204 37.5059H65.6251C74.2559 37.5059 82.3536 40.9687 89.3673 46.2949C96.3809 51.6211 98.4376 56.25 98.4376 56.25L46.8751 106.641C46.8751 106.641 40.2833 103.295 36.5567 98.5254C32.8302 93.7559 28.1895 87.9316 28.1661 76.7578C28.1251 55.9863 43.5938 38.7598 63.4044 37.5645Z'
                  fill='#F45C5E'
                />
                <path
                  d='M229.278 225.351C229.272 225.345 229.269 225.337 229.269 225.328C229.269 225.319 229.272 225.311 229.278 225.305C249.024 201.562 258.399 168.891 250.195 134.314C242.203 100.611 207.615 66.5273 173.824 58.9277C106.641 43.8222 46.9162 94.7519 46.9162 159.375C46.8926 183.475 55.3516 206.815 70.8107 225.305C70.8165 225.311 70.8197 225.319 70.8197 225.328C70.8197 225.337 70.8165 225.345 70.8107 225.351L42.7736 253.125C42.7678 253.131 42.7646 253.14 42.7646 253.148C42.7646 253.157 42.7678 253.165 42.7736 253.172L56.2502 266.361C56.2566 266.367 56.265 266.37 56.2736 266.37C56.2823 266.37 56.2906 266.367 56.297 266.361L84.0881 238.605C84.0945 238.6 84.1028 238.596 84.1115 238.596C84.1201 238.596 84.1285 238.6 84.1349 238.605C102.637 254.043 125.97 262.499 150.068 262.499C174.165 262.499 197.498 254.043 216 238.605H216.041L243.75 266.361C243.757 266.367 243.765 266.37 243.774 266.37C243.782 266.37 243.791 266.367 243.797 266.361L257.813 253.125L229.278 225.351ZM159.416 168.75H93.7502V150.059L93.7795 150.029H140.654V84.3749H159.404L159.416 168.75Z'
                  fill='#F45C5E'
                />
              </svg>
            ) : (
              <svg width='27' height='27' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M243.791 159.375C243.791 140.833 238.293 122.707 227.991 107.29C217.69 91.8732 203.048 79.857 185.918 72.7613C168.787 65.6656 149.937 63.809 131.751 67.4264C113.566 71.0437 96.861 79.9726 83.7499 93.0837C70.6387 106.195 61.7099 122.9 58.0925 141.085C54.4751 159.271 56.3317 178.121 63.4274 195.252C70.5231 212.382 82.5393 227.024 97.9564 237.325C113.374 247.627 131.499 253.125 150.041 253.125C174.905 253.125 198.751 243.248 216.332 225.666C233.914 208.085 243.791 184.239 243.791 159.375ZM83.2735 53.4434C78.3539 49.2335 72.1 46.906 65.6251 46.875L63.9903 46.9219C49.0196 47.8242 37.5001 60.9375 37.5411 76.7578C37.5411 84.498 40.2716 88.1074 43.9161 92.7129C44.1425 93.0088 44.4284 93.254 44.7554 93.4326C45.0824 93.6113 45.4432 93.7194 45.8146 93.75H46.3302C46.6205 93.7448 46.9058 93.6729 47.1638 93.5398C47.4219 93.4067 47.6459 93.216 47.8185 92.9824L83.4259 58.0078C83.7299 57.7003 83.9675 57.3336 84.1237 56.9304C84.2799 56.5272 84.3516 56.0961 84.3341 55.6641C84.3193 55.2409 84.2176 54.8253 84.0351 54.4433C83.8526 54.0612 83.5934 53.7208 83.2735 53.4434ZM216.727 53.4434C221.646 49.2335 227.9 46.906 234.375 46.875L236.01 46.9219C250.981 47.8242 262.5 60.9375 262.459 76.7578C262.459 84.498 259.729 88.1074 256.084 92.7129C255.857 93.0077 255.571 93.2518 255.244 93.4294C254.917 93.607 254.557 93.7142 254.186 93.7441H253.67C253.38 93.7389 253.094 93.667 252.836 93.5339C252.578 93.4008 252.354 93.2101 252.182 92.9766L216.574 58.0078C216.27 57.7003 216.033 57.3336 215.877 56.9304C215.72 56.5272 215.649 56.0961 215.666 55.6641C215.681 55.2409 215.783 54.8253 215.965 54.4433C216.148 54.0612 216.407 53.7208 216.727 53.4434Z'
                  stroke='#737373'
                  strokeWidth='18.75'
                  strokeMiterlimit='10'
                />
                <path
                  d='M150.041 93.75V159.375H103.166M243.791 253.125L220.354 229.688M56.291 253.125L79.7285 229.688'
                  stroke='#737373'
                  strokeWidth='18.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
            <div></div>
          </div>
        </div>
      </div>
      <div className='absolute left-0 top-[59px] bg-ourGray w-full h-[1px]'></div>
    </>
  );
}
