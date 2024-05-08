import type { Metadata } from 'next';
import Nickname from '../_components/Nickname';

export const metadata: Metadata = {
  title: '회원가입',
  description: '문해력 학습 서비스 심심한 사과의 회원가입 페이지',
};

export default function Page() {
  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='py-20'></div>
      <div className='text-xs w-80'>
        <span className='text-ourBlue'> 1</span>
        <span className='text-ourBlack'> / 3 </span>
      </div>
      <div className='pb-1'></div>
      <div className='text-2xl font-semibold w-80'>별명 짓기</div>
      <div className='py-2'></div>
      <Nickname />
    </div>
  );
}
