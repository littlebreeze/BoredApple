'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';

import { useGameRoomInfo } from '@/queries/get-room-info';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useGameWaitStore } from '@/stores/game-wait';
import { useWebsocketStore } from '@/stores/websocketStore';

export default function InsertPasswordModal() {
  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [isCorrect, setCorrect] = useState<boolean>(true);

  const { clickedRoom, setClickedRoom, setIsShow, enteredRoom, setEnteredRoom } = useGameWaitStore();
  const { connect } = useWebsocketStore();

  // 비밀번호 체크
  const onClickPasswordCheck = () => {
    if (password === clickedRoom?.roomPassword) {
      setIsShow(false);
      setEnteredRoom(clickedRoom);
    } else {
      setCorrect(false);
    }
  };

  return (
    <>
      <div className='rounded-md absolute top-0 left-0 w-full h-full bg-ourBlack/30 flex justify-center items-center'>
        <div className='relative gap-7 w-1/2 md:w-3/5 lg:w-2/5 h-2/5 bg-ourLightGray rounded-xl flex flex-col justify-center items-center'>
          <div
            className='absolute top-3 right-3 cursor-pointer'
            onClick={() => {
              setIsShow(false);
              setClickedRoom(null);
            }}
          >
            <svg width='25' height='25' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M244.324 224.426C246.966 227.068 248.45 230.651 248.45 234.387C248.45 238.123 246.966 241.706 244.324 244.348C241.682 246.989 238.099 248.474 234.363 248.474C230.627 248.474 227.044 246.989 224.402 244.348L150 169.922L75.5742 244.324C72.9324 246.966 69.3493 248.45 65.6133 248.45C61.8772 248.45 58.2941 246.966 55.6523 244.324C53.0105 241.682 51.5264 238.099 51.5264 234.363C51.5264 230.627 53.0105 227.044 55.6523 224.402L130.078 150L55.6758 75.5742C53.034 72.9324 51.5498 69.3493 51.5498 65.6133C51.5498 61.8772 53.034 58.2941 55.6758 55.6523C58.3176 53.0105 61.9006 51.5264 65.6367 51.5264C69.3728 51.5264 72.9558 53.0105 75.5976 55.6523L150 130.078L224.426 55.6406C227.068 52.9988 230.651 51.5146 234.387 51.5146C238.123 51.5146 241.706 52.9988 244.348 55.6406C246.989 58.2824 248.474 61.8655 248.474 65.6015C248.474 69.3376 246.989 72.9207 244.348 75.5625L169.922 150L244.324 224.426Z'
                fill='#202632'
              />
            </svg>
          </div>
          <div className='flex flex-row items-baseline gap-1 justify-center'>
            <div
              className={`text-ourTheme font-bold text-2xl ${
                String(clickedRoom?.roomName).length > 6 ? 'w-1/3 truncate' : ''
              }`}
            >
              {clickedRoom?.roomName}
            </div>
            <div className='font-bold text-xl'>에 입장</div>
          </div>
          <input
            className={`appearance-none rounded w-2/3 p-3 leading-tight focus:outline-none ${
              isCorrect ? 'text-gray-700 ' : 'text-rose-500'
            }`}
            type='text'
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={(e) => {
              setCorrect(true);
              setPassword(e.target.value);
            }}
          />
          <div
            className={`px-7 py-2  rounded-full text-white duration-[0.2s] cursor-not-allowed ${
              password ? 'cursor-pointer bg-ourBlack hover:bg-ourTheme' : 'bg-ourDarkGray'
            }`}
            onClick={onClickPasswordCheck}
          >
            확인
          </div>
        </div>
      </div>
    </>
  );
}
