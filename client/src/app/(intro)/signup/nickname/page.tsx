import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '문해력 학습 서비스 심심한 사과의 회원가입 페이지',
};

export default function Page() {
  return (
    <div className='flex flex-col h-screen bg-red-200 items-center '>
      <div>1/4</div>
      <div>별명 짓기</div>
      <div>우선 멋진 별명을 지어봐요! 잘 기억해 둘게요.</div>
      <div>입력칸</div>
      <div>4글자 이하로 지어주세요.</div>
      <div>다음버튼</div>
    </div>
  );
}
