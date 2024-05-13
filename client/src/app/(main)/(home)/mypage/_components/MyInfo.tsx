'use client';

import { useGetNickname } from '@/stores/get-nickname';

export default function MyInfo() {
  const { data: nickname } = useGetNickname();
  const myNickname = nickname ?? '사용자';
  return (
    <>
      <span className='text-2xl font-bold'>{myNickname}</span>의 활동 기록
    </>
  );
}
