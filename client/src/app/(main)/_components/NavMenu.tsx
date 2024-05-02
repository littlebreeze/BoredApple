'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <div className='flex w-full max-w-[1000px] h-[60px] items-center justify-between'>
        <Link href='/home' className='flex justify-start w-36 items-center  cursor-pointer'>
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
        </div>
      </div>
      <div className='absolute left-0 top-[59px] bg-ourGray w-full h-[1px]'></div>
    </>
  );
}
