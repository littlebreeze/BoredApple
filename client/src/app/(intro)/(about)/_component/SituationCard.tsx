'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SituationCard({ svg, content }: { svg: string; content: string }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className='bg-white h-28 md:h-44 lg:h-44 shadow-[5px_5px_20px_8px_rgba(72,147,255,0.15)] gap-5 rounded-3xl w-3/4 md:w-60 lg:w-60 flex flex-col sm:flex-row md:flex-col lg:flex-col justify-center items-center'
      style={{
        transition: 'all 300ms ease',
        transform: `translateY(${isHovered ? '-10%' : '0%'})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`/about/${svg}.svg`}
        loading='eager'
        height={100}
        width={100}
        alt=''
        priority
        className='h-2/5 sm:h-2/3 md:h-2/5 lg:h-2/5 w-auto'
      />
      <div className='text-base font-bold text-center md:text-lg lg:text-lg text-ourDarkGray'>{content}</div>
    </div>
  );
}
