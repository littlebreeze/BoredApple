'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import { useGameRoomList } from '@/queries/game-wait';
import { useGameRoomInfo } from '@/queries/get-room-info';
import { useGameWaitStore } from '@/stores/game-wait';
import { useWebsocketStore } from '@/stores/websocketStore';
import { useGameRoomStore } from '@/stores/game-room-info';

import MakeRoomBtn from './MakeRoomBtn';
import GameRoomItem from './GameRoomItem';
import PagingBtn from './PagingBtn';
import QuickStartGameBtn from './QuickStartGameBtn';
import RefreshRoomsBtn from './RefreshRoomsBtn';
import InsertPasswordModal from './InsertPasswordModal';

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

export default function GameRightSection() {
  const router = useRouter();

  // STORE
  const {
    pageNum,
    isShow,
    roomList,
    setRoomList,
    isEndPage,
    setIsEndPage,
    clickedRoom,
    setClickedRoom,
    enteredRoom,
    setEnteredRoom,
  } = useGameWaitStore();
  const { connect, stompClient } = useWebsocketStore();
  const { setGameRoomInfo } = useGameRoomStore();

  // 방 목록 요청 쿼리
  const { data, isLoading, refetch, isFetching } = useGameRoomList(pageNum);

  // 방 정보 요청 쿼리
  const { data: roomData, isLoading: getLoading, isError, error } = useGameRoomInfo(enteredRoom?.id);

  // 출력을 위한 복사 리스트
  const [duplList, setDuplList] = useState<(GameRoomInfo | undefined)[]>(new Array(6).fill(undefined));

  // 출력 리스트 구성 메서드
  const generateRoomItems = (list: GameRoomInfo[]): (GameRoomInfo | undefined)[] => {
    let duplicatedList: (GameRoomInfo | undefined)[] = [];
    for (let idx = 0; idx < 6; idx++) {
      if (roomList && idx < roomList.length) duplicatedList.push(list[idx]);
      else duplicatedList.push(undefined);
    }
    return duplicatedList;
  };

  // 페이지 바뀌면 방 목록 요청
  useEffect(() => {
    if (data?.data) {
      setIsEndPage(data.data.data.isEndPage);
      setRoomList(data.data.data.gameRoomResList);
    } else {
      setRoomList([]);
    }
  }, [isLoading, pageNum, isFetching]);

  // 방 목록이 바뀌면 출력용 리스트 변경
  useEffect(() => {
    setDuplList(generateRoomItems(roomList));
  }, [roomList]);

  // 들어갈 방 바꼈을 때,
  useEffect(() => {
    if (isError)
      Swal.fire({
        title: '방에 입장할 수 없습니다!',
        text: '방 상태가 변경되었습니다. 새로고침 버튼을 눌러주세요!',
        confirmButtonColor: '#0064FF',
      });
    if (!getLoading && !isError && roomData) {
      // 데이터가 로딩 중이 아니고 에러가 없고 데이터가 존재할 때만 실행
      const roomDataData = roomData.data.data;
      setGameRoomInfo({ ...roomDataData });
      connect(String(enteredRoom?.id));

      router.push(`/game/rooms/${enteredRoom?.id}`);
    }
  }, [enteredRoom, getLoading, isError, roomData]);

  useEffect(() => {
    return () => {
      setClickedRoom(null);
      setEnteredRoom(null);
    };
  }, []);

  return (
    <div className='relative'>
      {isShow && <InsertPasswordModal />}
      <div className='flex flex-row justify-between mb-2'>
        <div className='flex flex-row w-2/4 lg:w-2/5 ml-2 px-3 py-3 gap-4 lg:px-5 lg:gap-5 bg-ourGray/50 rounded-xl'>
          <MakeRoomBtn />
          <QuickStartGameBtn />
        </div>
        <div className='w-1/4 lg:w-1/5 lg:px-5 px-4 py-3 mr-2 bg-ourGray/50 rounded-xl' onClick={() => refetch()}>
          <RefreshRoomsBtn isFetching={isFetching} />
        </div>
      </div>
      <div className='grid grid-cols-2 py-4 px-5 gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-6 lg:gap-x-6 lg:px-6 bg-ourGray/50 rounded-xl'>
        {duplList.map((info: GameRoomInfo | undefined, idx: number) => (
          <GameRoomItem key={idx} roomInfo={info} />
        ))}
      </div>
      <div className='flex flex-row py-4 gap-1 px-8 md:gap-3 md:px-8 lg:gap-6 lg:px-20'>
        <PagingBtn title='이전' activate={pageNum !== 1} />
        {/* <PagingBtn title='다음' activate={roomList.length > 0 && roomList[0].isEndPage} /> */}
        <PagingBtn title='다음' activate={!isEndPage} />
      </div>
    </div>
  );
}
