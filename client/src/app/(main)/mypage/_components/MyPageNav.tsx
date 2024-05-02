'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function MyPaGeNav() {
  const segment = useSelectedLayoutSegments();

  const analysisClass =
    segment[0] === 'analysis'
      ? 'flex flex-1 justify-center items-center h-full cursor-pointer bg-black text-white rounded-full'
      : 'flex flex-1 justify-center items-center h-full cursor-pointer';
  const recordClass =
    segment[0] === 'record'
      ? 'flex flex-1 justify-center items-center h-full cursor-pointer bg-black text-white rounded-full'
      : 'flex flex-1 justify-center items-center h-full cursor-pointer';

  return (
    <div className='flex w-full justify-center rounded-full bg-white h-8 items-center'>
      <Link href={'analysis'} className={analysisClass}>
        분석 보고서
      </Link>
      <Link href={'record'} className={recordClass}>
        학습 일지
      </Link>
    </div>
  );
}
