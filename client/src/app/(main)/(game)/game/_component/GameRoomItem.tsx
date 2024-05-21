'use client';

import { useRouter } from 'next/navigation';

import { useGameWaitStore } from '@/stores/game-wait';
import { useEffect } from 'react';

type GameRoomInfo = {
  id: number;
  roomName: string;
  isSecret: boolean;
  roomPassword: string;
  nowNum: number;
  maxNum: number;
  isStarted: boolean;
  roomCreatorName: string;
  quizCount: number;
  isEndPage: boolean;
};

type Props = {
  roomInfo: GameRoomInfo | undefined;
};

export default function GameRoomItem({ roomInfo }: Props) {
  const router = useRouter();

  const { setIsShow, clickedRoom, setClickedRoom, setEnteredRoom } = useGameWaitStore();

  // 방 눌렀을 때, 선택된 방 저장
  const onClickRoomItem = () => {
    // 시작한 방이 아니고, 꽉찬 방이 아니면
    if (!roomInfo?.isStarted && roomInfo?.nowNum !== roomInfo?.maxNum) {
      // 방 선택
      if (roomInfo) {
        if (roomInfo.isSecret) {
          setIsShow(true);
          setClickedRoom(roomInfo);
        } else {
          setEnteredRoom(roomInfo);
        }
      }
    }
  };

  if (!roomInfo) {
    return <div className='bg-white/80 rounded-xl h-28 flex flex-row p-3 md:px-5 lg:px-5'></div>;
  } else
    return (
      <>
        <div
          onClick={onClickRoomItem}
          className={`bg-white/80 rounded-xl h-28 flex flex-row p-3 md:px-5 lg:px-5 border-4 border-white duration-150  
          ${roomInfo!.isSecret ? 'hover:border-ourGray' : 'hover:border-ourBlue'} ${
            roomInfo.isStarted || roomInfo.nowNum === roomInfo.maxNum ? 'cursor-not-allowed ' : 'cursor-pointer '
          }`}
        >
          <div className='w-1/5 font-semibold text-ourDarkGray text-base md:text-xl lg:text-xl mt-1 flex flex-col justify-between'>
            <div>{String(roomInfo!.id).padStart(3, '0')}</div>
            {roomInfo.isStarted && <div className='text-sm text-ourTheme'>게임중</div>}
          </div>
          <div className='w-3/5 flex flex-col justify-between'>
            <div
              className='font-semibold text-base sm:text-2xl md:text-2xl lg:text-2xl truncate'
              title={roomInfo!.roomName}
            >
              {roomInfo!.roomName}
            </div>
            <div className='text-ourDarkGray text-sm'>{roomInfo!.roomCreatorName}의 방</div>
          </div>
          <div className='w-1/5 flex flex-col justify-between items-end'>
            <div className='flex flex-row gap-1 items-baseline mt-1'>
              <div
                className={`font-semibold text-sm ${
                  roomInfo?.nowNum === roomInfo?.maxNum ? 'text-rose-500' : 'text-ourBlack'
                }`}
              >
                {roomInfo!.nowNum}/{roomInfo!.maxNum}
              </div>
              <div>
                {roomInfo!.isSecret ? (
                  <svg width='15' height='15' viewBox='0 0 350 500' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M302.273 199.747V132.111C302.956 97.849 289.948 64.713 266.096 39.954C242.244 15.1949 209.489 0.829106 175 0C140.511 0.829106 107.756 15.1949 83.9039 39.954C60.0517 64.713 47.044 97.849 47.7273 132.111V199.747H0V468.394C0 476.777 3.35226 484.816 9.31933 490.743C15.2864 496.67 23.3795 500 31.8182 500H318.182C326.621 500 334.714 496.67 340.681 490.743C346.648 484.816 350 476.777 350 468.394V199.747H302.273ZM190.909 361.41V405.183H159.091V359.987C151.345 356.029 145.196 349.558 141.662 341.65C138.128 333.742 137.422 324.871 139.662 316.51C141.902 308.148 146.953 300.799 153.977 295.681C161.001 290.564 169.575 287.986 178.276 288.375C186.978 288.764 195.285 292.096 201.817 297.82C208.35 303.543 212.715 311.314 214.19 319.841C215.665 328.368 214.161 337.14 209.926 344.701C205.691 352.262 198.981 358.158 190.909 361.41ZM270.455 199.747H79.5455V132.111C78.8596 106.23 88.5143 81.1313 106.4 62.2989C124.286 43.4666 148.949 32.4318 175 31.6056C201.051 32.4318 225.714 43.4666 243.6 62.2989C261.486 81.1313 271.14 106.23 270.455 132.111V199.747Z'
                      fill='black'
                    />
                  </svg>
                ) : (
                  <svg width='20' height='15' viewBox='0 0 500 500' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M374.981 0C341.109 0.819779 308.941 15.024 285.516 39.5045C262.091 63.985 249.316 96.7482 249.987 130.625V203.125H0V468.75C0 477.038 3.29223 484.987 9.15245 490.847C15.0127 496.708 22.9608 500 31.2484 500H312.484C320.772 500 328.72 496.708 334.58 490.847C340.44 484.987 343.733 477.038 343.733 468.75V203.125H281.236V130.625C280.562 105.035 290.044 80.2185 307.61 61.5981C325.175 42.9776 349.397 32.0669 374.981 31.25C400.566 32.0669 424.787 42.9776 442.353 61.5981C459.918 80.2185 469.4 105.035 468.726 130.625V237.344C468.726 241.488 470.373 245.462 473.303 248.392C476.233 251.323 480.207 252.969 484.351 252.969C488.494 252.969 492.469 251.323 495.399 248.392C498.329 245.462 499.975 241.488 499.975 237.344V130.625C500.646 96.7482 487.871 63.985 464.446 39.5045C441.021 15.024 408.853 0.819779 374.981 0ZM187.491 362.969V406.25H156.242V361.562C148.635 357.648 142.596 351.251 139.125 343.431C135.654 335.612 134.962 326.841 137.161 318.574C139.361 310.307 144.322 303.04 151.22 297.98C158.118 292.92 166.538 290.371 175.084 290.756C183.63 291.14 191.788 294.435 198.203 300.094C204.619 305.754 208.907 313.436 210.355 321.868C211.804 330.299 210.326 338.973 206.167 346.449C202.008 353.925 195.418 359.754 187.491 362.969Z'
                      fill='black'
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='text-xs text-ourBlack'>문제수</div>
              <div className='text-ourBlack'>{roomInfo!.quizCount}</div>
            </div>
          </div>
        </div>
      </>
    );
}
