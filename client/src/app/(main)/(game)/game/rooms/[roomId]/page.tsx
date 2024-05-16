'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Swal from 'sweetalert2';
import { useGameRoomStore } from '@/stores/game-room-info';
import { useWebsocketStore } from '@/stores/websocketStore';

import QuizWrapper from './_component/QuizWrapper';
import TimerWrapper from './_component/TimerWrapper';
import GameResultsModal from './_component/GameResultsModal';
import ChatWrapper from './_component/ChatWrapper';
import GameScoreBoard from './_component/GameScoreBoard';
import RoomInfoWrapper from './_component/RoomInfoWrapper';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();
  const { myNickname, myUserId, roomId: storedRoomId, roomPlayerRes, clearGameRoomInfo } = useGameRoomStore();

  const router = useRouter();
  const { disconnect, isGaming } = useWebsocketStore();
  const { setGameRoomInfo, resultModalIsShow } = useGameRoomStore();

  // 개발자 도구 차단
  useEffect(() => {
    const blockDevTools = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      )
        e.preventDefault();
    };

    const blockRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', blockDevTools);
    window.addEventListener('contextmenu', blockRightClick);

    return () => {
      window.addEventListener('keydown', blockDevTools);
      window.addEventListener('contextmenu', blockRightClick);
    };
  }, []);

  // myUserId 없으면 game으로 보내기
  useEffect(() => {
    if (!myUserId) router.replace('/game');
  }, []);

  useEffect(() => {
    // unMount 될 때 disconnect
    return () => {
      disconnect({
        type: 'EXIT',
        roomId: storedRoomId!,
        sender: myNickname!,
        senderId: myUserId!,
        message: '나갑니다',
      });
    };
  }, []);

  // 새로고침, 브라우저 종료시
  useEffect(() => {
    const handleBeforeUnload = () => {
      return disconnect({
        type: 'EXIT',
        roomId: storedRoomId!,
        sender: myNickname!,
        senderId: myUserId!,
        message: '나갑니다',
      });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 브라우저 종료 시 => 안 됨...
    // window.addEventListener(
    //   'unload',
    //   () => {
    //     return disconnect({
    //       type: 'EXIT',
    //       roomId: storedRoomId!,
    //       sender: myNickname!,
    //       senderId: myUserId!,
    //       message: '나갑니다',
    //     });
    //   }
    //   //, { once: true }
    // );

    // 언마운트시 이벤트리스너 삭제
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [storedRoomId, myNickname, myUserId, disconnect]);

  return (
    <div className='flex flex-col items-center'>
      {resultModalIsShow && <GameResultsModal />}
      <div className='relative flex justify-center w-full gap-10 -top-8'>
        {/* 점수판 */}
        <div className='w-1/6 flex flex-col justify-between items-center'>
          <GameScoreBoard />
          <button
            className='w-4/5 p-3 mt-3 text-white rounded-3xl bg-[#FF0000] mb-1'
            onClick={() => {
              Swal.fire({
                title: '정말 게임을 나가시겠습니까?',
                confirmButtonColor: '#D9D9D9',
                confirmButtonText: '나가기',
                showCancelButton: true,
                cancelButtonColor: '#0064FF',
                cancelButtonText: '취소',
              }).then((leavePage) => {
                if (leavePage.isConfirmed) {
                  router.back();
                }
              });
            }}
          >
            게임나가기
          </button>
        </div>
        {/* 문제 및 힌트 */}
        <div className='w-1/2'>
          <QuizWrapper roomId={roomId} />
        </div>
        {/* 시간 */}
        <div className='w-1/6 flex flex-col'>{isGaming ? <TimerWrapper roomId={roomId} /> : <RoomInfoWrapper />}</div>
      </div>
      <div className='w-1/2 h-60'>
        {/* 채팅창 */}
        <ChatWrapper roomId={Number(roomId)} />
      </div>
    </div>
  );
}
