import type { Metadata } from 'next';
import MyAbility from './_components/Myability';

export const metadata: Metadata = {
  title: '분석 보고서',
  description: '문해력 학습 서비스 심심한 사과의 분석 보고서',
};

export default async function Analysis() {
  return (
    <div className='w-full'>
      <div className='flex flex-col '>
        <div className='pt-5 pb-2 text-lg text-ourBlack'>종합 평가</div>
        <MyAbility />
      </div>
    </div>
  );
}
