'use client';

import { useParams } from 'next/navigation';
import ChatWrapper from './_component/ChatWrapper';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();
  return (
    <>
      <div>{roomId}</div>
      <div className='flex justify-center'>
        <ChatWrapper />
      </div>
    </>
  );
}
