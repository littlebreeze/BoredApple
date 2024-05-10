'use client';

import { useParams } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';
import GameScoreBoard from './_component/GameScoreBoard';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useEffect } from 'react';
import instance from '@/utils/interceptor';

type GameRoomDetail = {
  myNickname: string | undefined;
  myUserId: number | undefined;
  roomId: number | undefined;
  maxNum: number | undefined;
  quizCount: number | undefined;
  creatorId: number | undefined;
  roomPlayerRes: { userId: number; nickname: string }[] | null;
};
const getGameRoomInfo = () => {
  const response = instance.get<{ data: GameRoomDetail }>(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/players`);
  return response;
};

export default function Page() {
  const { setGameRoomInfo } = useGameRoomStore();
  const { roomId } = useParams<{ roomId: string }>();
  const {
    myNickname,
    myUserId,
    roomId: storedRoomId,
    maxNum,
    quizCount,
    creatorId,
    roomPlayerRes,
  } = useGameRoomStore();

  useEffect(() => {
    getGameRoomInfo()
      .then((value) => {
        setGameRoomInfo(value.data.data);
      })
      .catch((error) => console.log(error));
    console.log(storedRoomId);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex justify-center w-full gap-10 -z-50 -top-8'>
        {/* 점수판 */}
        <div className='w-1/6'>
          <GameScoreBoard />
          <button className='w-full p-3 mt-3 text-white rounded-3xl bg-[#FF0000]'>게임나가기</button>
        </div>
        {/* 문제 및 힌트 */}
        <div className='w-1/2'>
          <div className='flex flex-col w-full h-56 p-3 bg-white rounded-xl'>
            <div>4 / 20</div>
            <div className='flex items-center justify-center flex-1 px-5 text-lg font-semibold font-Batang'>
              세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.
              세금을 가혹하게 거두어들이고, 무리하게 재물을 빼앗음.
            </div>
          </div>
          <div className='flex justify-center h-16 gap-3 mt-5'>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄹ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㅈ</div>
            <div className='flex items-center justify-center w-16 text-3xl text-white bg-ourGreen rounded-xl'>ㄱ</div>
            {/* <button className='w-1/2 text-3xl text-white rounded-3xl bg-ourRed'>게임시작</button> */}
          </div>
        </div>
        {/* 시간 */}
        <div className='w-1/6'>
          <div className='flex flex-col items-center p-3 bg-white rounded-xl'>
            <div>남은 시간</div>
            <div>0:00</div>
          </div>
        </div>
      </div>
      <div className='w-2/3 h-60'>
        {/* 채팅창 */}
        <ChatWrapper roomId={roomId} />
      </div>
    </div>
  );
}
