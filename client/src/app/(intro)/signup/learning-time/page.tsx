import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '문해력 학습 서비스 심심한 사과의 회원가입 페이지',
};

export default function Page() {
  return (
    <div className='bg-yellow-400'>
      <div>으악</div>
      {/* <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg ${
          selectedOption === -1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourTheme duration-[0.2s] hover:bg-ourTheme/80'
        } text-white`}
        // onClick={showResult}
      >
        결과 확인하기
      </button> */}
    </div>
  );
}
