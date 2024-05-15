import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';

import { GameRoomDetail, GameRoomInfo } from '@/types/GameRoom';
import instance from '@/utils/interceptor';
import { useGameWaitStore } from '@/stores/game-wait';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useEffect } from 'react';

const getGameRoomInfo = async () => {
  const response = await instance.get<{ data: GameRoomDetail }>(
    `${process.env.NEXT_PUBLIC_API_SERVER}/game-service/quick-entry`
  );
  return response;
};

export default function QuickStartGameBtn() {
  const router = useRouter();

  const { connect } = useWebsocketStore();
  const { pageNum, roomList } = useGameWaitStore();
  const { setGameRoomInfo } = useGameRoomStore();

  const onClickQuickStart = () => {
    console.log('click');
    // if (pageNum === 1 && roomList.length === 0)
    //   Swal.fire({
    //     title: '입장 가능한 방이 없습니다!',
    //     text: '새로고침하거나 직접 방을 만들어 대결을 시작하세요!',
    //     confirmButtonColor: '#0064FF',
    //   });
    // else
    getGameRoomInfo()
      .then((response) => {
        const roomData = response.data.data;
        console.log('입장할 방 정보: ', roomData);
        setGameRoomInfo(roomData);
        connect(String(roomData.roomId));
        router.push(`/game/rooms/${roomData.roomId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        className='bg-white/80 rounded-md cursor-pointer text-sm md:text-lg lg:text-lg w-full h-11 flex justify-center items-center border-2 border-white hover:border-ourRed duration-100'
        onClick={onClickQuickStart}
      >
        빠른 대전
      </div>
    </>
  );
}
