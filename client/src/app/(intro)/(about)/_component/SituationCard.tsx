'use client';

import { useState } from 'react';

export default function SituationCard() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className='bg-white h-28 md:h-44 lg:h-44 shadow-[5px_5px_20px_8px_rgba(72,147,255,0.15)] rounded-3xl w-full md:w-56 lg:w-56'
      style={{
        transition: 'all 300ms ease',
        transform: `translateY(${isHovered ? '-10%' : '0%'})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></div>
  );
}
