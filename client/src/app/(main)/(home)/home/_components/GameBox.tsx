'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import gameBackground from '@/../public/home/game-background.svg';
import Image from 'next/image';

export default function GameBox() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/game');
  };

  return (
    <div className='relative rounded-xl text-center h-full overflow-hidden'>
      <div className='absolute'>
        <Image src={gameBackground} alt='한지' />
      </div>
      <div className='relative'>
        <div className='py-4'></div>
        <div className='font-Ansungtangmyun text-3xl'>문해력의 핵심이 되는 어휘력!</div>
        <div className='py-2'></div>
        <div className='font-Ansungtangmyun text-xl'>실시간 어휘 퀴즈 대결을 통해 문해력을 높여보세요!</div>
        <div className='py-4'></div>
        <button
          className='mb-4 w-96 h-12 rounded-lg text-lg bg-black duration-[0.2s] hover:bg-black/80 text-white'
          onClick={handleClick}
        >
          문해력 높이러 가기
        </button>
      </div>
    </div>
  );
}
