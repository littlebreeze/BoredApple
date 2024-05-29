'use client';
import { ReactNode, useEffect, useState } from 'react';

export default function CardContainer({ children, direction }: { children: ReactNode; direction: string }) {
  const [slideIndex, setSlideIdex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<string>('translateX');
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (slideIndex === 46) setSlideIdex(0);
    if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // md size
      setSlideDirection('translateY');
      if (direction === 'upside') setIsShow(false);
    } else if (window.innerWidth >= 1024) {
      // lg size
      setSlideDirection('translateY');
      if (direction === 'upside') setIsShow(false);
    } else {
      // default
      setSlideDirection('translateX');
      if (direction === 'upside') setIsShow(true);
    }
    setTimeout(() => {
      setSlideIdex(slideIndex + 1);
    }, 1000);
  }, [slideIndex]);

  if (isShow) return null;
  return (
    <div
      className={`block mt-[100px] mb-[60px] md:mt-0 lg:mt-0 md:w-1/5 lg:w-1/5 relative`}
      style={{
        transition: 'all 1000ms linear',
        transform: `${slideDirection}(${(direction === 'upside' ? 1 : -1) * (5 * slideIndex)}%)`,
        // transform: `${slideDirection}(${-1 * (5 * slideIndex)}%)`,
      }}
    >
      {children}
    </div>
  );
}
