'use client';
import { ReactNode, useEffect, useState } from 'react';

export default function CardContainer({ children }: { children: ReactNode }) {
  const [slideIndex, setSlideIdex] = useState(0);

  useEffect(() => {
    if (slideIndex === 23) setSlideIdex(0);
    setTimeout(() => {
      setSlideIdex(slideIndex + 1);
    }, 1000);
  }, [slideIndex]);

  return (
    <div
      className='w-full block mt-[100px] mb-[60px]'
      style={{
        transition: 'all 1000ms linear',
        transform: `translateX(${-1 * (5 * slideIndex)}%)`,
      }}
    >
      {children}
    </div>
  );
}
