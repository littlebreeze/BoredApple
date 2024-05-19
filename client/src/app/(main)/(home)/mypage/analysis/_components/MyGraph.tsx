'use client';

import { useLabelStore } from '@/stores/label';
import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface LabelInfo {
  label: string;
  position: string;
}

export default function MyGraph({ ability }: { ability: number[] }) {
  // 모두 8배, 10 넘는다면 10으로
  const scaledAbility = ability.map((value) => Math.min(value * 8, 10));

  const data = {
    labels: ['사실적읽기', '추론능력', '어휘', '인지능력', '읽기속도'],

    datasets: [
      {
        // 데이터
        data: scaledAbility.length ? scaledAbility : [0, 0, 0, 0, 0],
        // 배경
        backgroundColor: 'rgba(72,147,255,0.3)',
        // border
        borderColor: 'blue',
        borderWidth: 1,
        // 포인터 크기 0
        pointRadius: 0,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        // radar 차트의 Redial 축
        suggestedMin: 0, // 최소값 0
        suggestedMax: 10, // 최대값 10
        ticks: {
          stepSize: 2, //눈금 간격 2
          display: false, // 숫자 표시 x
        },
        pointLabels: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const { activeLabel, setActiveLabel } = useLabelStore();

  const toggleLabel = (label: string) => {
    if (activeLabel === label) return;
    setActiveLabel(label);
  };

  const labelInfo: LabelInfo[] = [
    { label: '사실적읽기', position: '-top-3 left-[63px]' },
    { label: '추론능력', position: 'top-16 -right-14' },
    { label: '어휘', position: 'bottom-1 right-4' },
    { label: '인지능력', position: 'bottom-1 left-1' },
    { label: '읽기속도', position: 'top-16 -left-14' },
  ];

  return (
    <div className='relative w-full h-full pt-5 pb-5 flex justify-center items-center'>
      <Radar
        data={data}
        options={options}
      />
      {labelInfo.map((info) => (
        <div
          key={info.label}
          className={`absolute ${info.position} text-xs rounded-full pr-2 py-1 flex items-center cursor-pointer`}
          style={{ border: activeLabel === info.label ? '1px solid #0064FF' : '1px solid #D1D5DB' }}
          onClick={() => {
            toggleLabel(info.label);
          }}
        >
          <div
            className='w-[8px] h-[8px] rounded-full mx-1'
            style={{ backgroundColor: activeLabel === info.label ? '#0064FF' : '#D1D5DB' }}
          ></div>
          {info.label}
        </div>
      ))}
    </div>
  );
}
