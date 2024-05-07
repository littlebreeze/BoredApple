import type { Metadata } from 'next';
import GlobalButton from '@/app/_common/GlobalButton';

export const metadata: Metadata = {
  title: '회원가입',
  description: '문해력 학습 서비스 심심한 사과의 회원가입 페이지',
};

export default function Page() {
  return (
    <div className='flex flex-col items-center h-screen bg-red-200 '>
      <div className=' bg-slate-400 w-80'>1/4</div>
      <div className='w-80 '>별명 짓기</div>
      <input className='p-3' type='text' placeholder='닉네임을 입력해 주세요.' />
      <div>특수문자 제외 2~10글자 이하로 지어주세요.</div>
      <GlobalButton />
    </div>
  );
}
