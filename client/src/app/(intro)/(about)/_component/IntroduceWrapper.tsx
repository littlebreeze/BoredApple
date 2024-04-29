'use client';
import { RefAttributes, useEffect, useRef, useState } from 'react';
import style from './IntroduceWrapper.module.css';

export default function IntroduceWrapper() {
  const div = useRef<HTMLDivElement>(null);
  const [boundingClientRect, setBoundingClientRect] = useState<number | undefined>(0);

  const handleScroll = () => {
    setBoundingClientRect(div.current?.getBoundingClientRect().top);
    const innerHeight = window.innerHeight;

    if (boundingClientRect && boundingClientRect > 0 && boundingClientRect < innerHeight - 200) {
      setTimeout(() => {
        div.current!.style.animation = '3s linear 1s infinite running slidein';
        div.current!.style.opacity = '1';
      }, 200);
    }
  };
  //   useEffect(() => {
  //     setBoundingClientRect(div.current?.getBoundingClientRect().top);
  //     const innerHeight = window.innerHeight;

  //     if (boundingClientRect && boundingClientRect > 0 && boundingClientRect < innerHeight) {
  //       console.log(boundingClientRect);
  //     }
  //   }, [boundingClientRect]);

  return (
    <div
      className={style.upside + ` flex flex-col gap-5 md:flex-row lg:flex-row justify-center`}
      //className='upside flex flex-col gap-5 md:flex-row lg:flex-row justify-center opacity-0'
      ref={div}
      onMouseMove={handleScroll}
      onScroll={handleScroll}
    >
      <div className='w-full md:w-1/2 lg:w-1/2 h-56 bg-slate-300'>글</div>
      <div className='w-full md:w-1/2 lg:w-1/2 h-56 bg-slate-300'>사진</div>
    </div>
  );
}
