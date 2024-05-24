'use client';

import { useEffect, useRef } from 'react';
import { useLabelStore } from '@/stores/label';
import readability from '@/../public/data/readabilityScores.json';

export default function MyAnalysis({ ability }: { ability: number[] }) {
  const { activeLabel, setActiveLabel } = useLabelStore();
  const labelRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (activeLabel && labelRefs.current[activeLabel]) {
      labelRefs.current[activeLabel]!.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [activeLabel, ability]);

  const labels = ['사실적읽기', '추론능력', '어휘', '인지능력', '읽기속도'];

  const getScore = (score: number) => {
    if (score >= 0 && score <= 2) return '아쉬움';
    if (score > 2 && score <= 4) return '약간아쉬움';
    if (score > 4 && score <= 6) return '보통';
    if (score > 6 && score <= 8) return '우수함';
    if (score > 8 && score <= 10) return '매우우수함';
    return null;
  };

  const getDescription = labels.map((label, idx) => {
    const score = getScore(ability[idx] * 8);
    const description = readability.find((item) => item.label === label && item.score === score)?.description;
    return { label, description, score };
  });

  if (!ability.length) return <div className='py-16 text-ourDarkGray'>분석 데이터가 부족합니다.</div>;

  return (
    <>
      <div className='flex w-full overflow-x-scroll gap-5 pt-5 scrollbar-hide'>
        {getDescription.map(({ label, description, score }) => (
          <div
            key={label}
            ref={(el) => {
              labelRefs.current[label] = el;
            }}
            className={'w-full flex-shrink-0 pt-3'}
          >
            <div className='flex justify-between w-full font-bold text-lg py-2'>
              <div>{label}</div>
              <div className='text-ourTheme'>{score}</div>
            </div>
            <div className='text-base'>{description}</div>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {['사실적읽기', '추론능력', '어휘', '인지능력', '읽기속도'].map((label: string) => (
          <div
            key={label}
            className='w-[8px] h-[8px] rounded-full mr-2 cursor-pointer'
            style={{ backgroundColor: activeLabel === label ? '#0064FF' : '#D1D5DB' }}
            onClick={() => {
              setActiveLabel(label);
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
