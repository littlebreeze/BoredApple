'use client';

import { useWebsocketStore } from '@/stores/websocketStore';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  const { timer, isTimerRunning, startGame, startTimer } = useWebsocketStore();

  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>Timer</div>
        <div className='text-center text-2xl'>{timer}</div>
        <div className='flex justify-between mt-3'>
          <button
            onClick={() => {
              startGame(roomId);
              startTimer(30);
              console.log('시작');
            }}
            className='px-4 py-2 bg-green-500 text-white rounded-lg'
          >
            시작
          </button>
        </div>
        <div className='text-center mt-3'>Timer is {isTimerRunning ? 'Running' : 'Stopped'}</div>
      </div>
    </>
  );
}
