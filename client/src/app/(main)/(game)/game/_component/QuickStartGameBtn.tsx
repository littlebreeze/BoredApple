import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';

import { GameRoomDetail, GameRoomInfo } from '@/types/GameRoom';
import instance from '@/utils/interceptor';
import { useGameWaitStore } from '@/stores/game-wait';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';

import loading from '@/../public/login/loading.png';

const getGameRoomInfo = async () => {
  const response = await instance.get<{ data: GameRoomDetail }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/game-service/quick-entry`
  );
  return response;
};

export default function QuickStartGameBtn() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { connect } = useWebsocketStore();
  const { pageNum, roomList } = useGameWaitStore();
  const { setGameRoomInfo } = useGameRoomStore();

  const onClickQuickStart = () => {
    setIsLoading(true);
    if (pageNum === 1 && roomList.length === 0) {
      Swal.fire({
        title: '입장 가능한 방이 없습니다!',
        text: '새로고침하거나 직접 방을 만들어 대결을 시작하세요!',
        confirmButtonColor: '#0064FF',
      });
      setIsLoading(false);
    } else if (!isLoading)
      getGameRoomInfo()
        .then((response) => {
          setIsLoading(false);
          const roomData = response.data.data;
          setGameRoomInfo(roomData);
          connect(String(roomData.roomId));
          router.push(`/game/rooms/${roomData.roomId}`);
        })
        .catch((error) => {
          Swal.fire({
            title: '입장 가능한 방이 없습니다!',
            text: '직접 방을 만들어 대결을 시작하세요!',
            confirmButtonColor: '#0064FF',
          });
        })
        .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div
        className={`rounded-md cursor-pointer text-sm md:text-lg lg:text-lg w-full h-11 flex justify-center items-center border-2 border-white hover:border-ourRed duration-100 
        ${isLoading ? 'bg-ourRed/80 text-white ' : 'bg-white/80 '}`}
        onClick={onClickQuickStart}
      >
        {isLoading ? (
          <div className='flex items-center'>
            찾는 중
            <Image src={loading} className='w-5 h-5 ml-2 motion-safe:animate-spin opacity-40' alt='로딩 중' />
          </div>
        ) : (
          '빠른 대전'
        )}
      </div>
    </>
  );
}
