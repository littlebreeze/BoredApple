'use client';

import { useWebsocketStore } from '@/stores/websocketStore';

export default function TimerWrapper({ roomId }: { roomId: string }) {
  const { timer, isGaming } = useWebsocketStore();
  if (!isGaming || timer > 30) return null;
  return (
    <>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl'>
        <div className='text-center'>남은 시간</div>
        <div className='text-center text-2xl'>{timer}</div>
      </div>
    </>
  );
}
