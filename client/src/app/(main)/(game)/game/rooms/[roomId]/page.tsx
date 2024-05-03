'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { roomId } = useParams<{ roomId: string }>();
  return <div className='bg-yellow-400'>게임 {roomId} 페이지</div>;
}
